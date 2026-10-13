/**
 * Polyfill for the `scrollsnapchanging` snap event
 * https://drafts.csswg.org/css-scroll-snap-2/#scrollsnapchanging
 *
 * Fires a `SnapEvent` at a snap container (or at its `Document` when the viewport
 * is the snap container) whenever the snap target that the container would snap
 * to changes during a scrolling operation. Smooth scrolls started through the
 * patched `scroll`, `scrollTo`, `scrollBy` and `scrollIntoView` methods are
 * evaluated at their destination right away, like native implementations do.
 *
 * Installs only when the native events are not supported.
 *
 * Limitations compared to native implementations:
 * - gestures and smooth scrolls started outside the patched methods are evaluated
 *   from the current scroll position, so they may report intermediate targets
 * - scroll containers inside shadow roots are not observed
 * - `scroll-snap-stop: always` is honored for the patched relative scrolls, but not
 *   during gestures, where the scroll velocity is not taken into account either
 * - the proximity strictness range is an approximation (a third of the snapport,
 *   matching the range observed in Chromium)
 */

const IDLE_DELAY = 128

const SETTLE_TOLERANCE = 2

const HANDLER_KEY = Symbol('onscrollsnapchanging')

const states = new WeakMap()

const pendingContainers = new Set()

const AXES = {
  x: {
    start: 'left',
    end: 'right',
    size: 'width',
    scroll: 'scrollLeft',
    client: 'clientWidth',
    offset: 'offsetWidth',
    scrollSize: 'scrollWidth',
    border: 'clientLeft',
    padStart: 'scrollPaddingLeft',
    padEnd: 'scrollPaddingRight',
    marginStart: 'marginLeft',
    marginEnd: 'marginRight',
  },
  y: {
    start: 'top',
    end: 'bottom',
    size: 'height',
    scroll: 'scrollTop',
    client: 'clientHeight',
    offset: 'offsetHeight',
    scrollSize: 'scrollHeight',
    border: 'clientTop',
    padStart: 'scrollPaddingTop',
    padEnd: 'scrollPaddingBottom',
    marginStart: 'marginTop',
    marginEnd: 'marginBottom',
  },
}

class SnapEvent extends Event {
  #snapTargetBlock
  #snapTargetInline

  constructor(type, { snapTargetBlock = null, snapTargetInline = null, ...eventInit } = {}) {
    super(type, eventInit)

    this.#snapTargetBlock = snapTargetBlock
    this.#snapTargetInline = snapTargetInline
  }

  get snapTargetBlock() {
    return this.#snapTargetBlock
  }

  get snapTargetInline() {
    return this.#snapTargetInline
  }
}

const parseLength = value => parseFloat(value) || 0

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const isVertical = writingMode => writingMode.startsWith('vertical') || writingMode.startsWith('sideways')

const isScrollContainer = ({ overflowX, overflowY }) => /auto|scroll|hidden|overlay/.test(overflowX + overflowY)

const isSmooth = (style, behavior) => behavior === 'smooth' || (behavior !== 'instant' && style.scrollBehavior === 'smooth')

const collectSnapAreas = (container) => {
  const areas = []

  const walk = (parent) => {
    for (const element of parent.children) {
      const style = getComputedStyle(element)

      if (style.display === 'none' || style.position === 'fixed') continue

      if (style.scrollSnapAlign !== 'none') {
        const [blockAlign, inlineAlign = blockAlign] = style.scrollSnapAlign.split(' ')

        areas.push({
          element,
          blockAlign,
          inlineAlign,
          snapStop: style.scrollSnapStop,
          marginTop: parseLength(style.scrollMarginTop),
          marginRight: parseLength(style.scrollMarginRight),
          marginBottom: parseLength(style.scrollMarginBottom),
          marginLeft: parseLength(style.scrollMarginLeft),
        })
      }

      if (element.children.length && !isScrollContainer(style)) walk(element)
    }
  }

  walk(container === document.scrollingElement ? document.documentElement : container)

  return areas
}

const createAxis = (container, style, name, root, rect, at) => {
  const props = AXES[name]
  const client = container[props.client]
  const padStart = parseLength(style[props.padStart])
  const padEnd = parseLength(style[props.padEnd])
  const scrollSize = container[props.scrollSize]
  const rtl = style.direction === 'rtl'
  const vertical = isVertical(style.writingMode)
  const flipped = name === 'x'
    ? (vertical ? style.writingMode.includes('rl') : rtl)
    : (vertical && rtl)
  const scale = root || !container[props.offset] ? 1 : rect[props.size] / container[props.offset]
  const min = flipped ? client - scrollSize : 0
  const max = flipped ? 0 : scrollSize - client

  return {
    props,
    align: name === 'x' ? (vertical ? 'blockAlign' : 'inlineAlign') : (vertical ? 'inlineAlign' : 'blockAlign'),
    flipped,
    scale,
    client,
    padStart,
    padEnd,
    min,
    max,
    // the current scroll offset anchors the content coordinates of the measured rects,
    // while position is the reachable offset the snap targets are evaluated against
    scroll: container[props.scroll],
    position: clamp(at ?? container[props.scroll], min, max),
    origin: root ? 0 : rect[props.start] + container[props.border] * scale,
    snapport: client - padStart - padEnd,
    best: null,
  }
}

const createAxes = (container, style, at) => {
  const [snapAxis] = style.scrollSnapType.split(' ')
  const vertical = isVertical(style.writingMode)
  const root = container === document.scrollingElement
  const rect = container.getBoundingClientRect()

  return {
    vertical,
    root,
    x: snapAxis === 'x' || snapAxis === 'both' || snapAxis === (vertical ? 'block' : 'inline')
      ? createAxis(container, style, 'x', root, rect, at?.x)
      : null,
    y: snapAxis === 'y' || snapAxis === 'both' || snapAxis === (vertical ? 'inline' : 'block')
      ? createAxis(container, style, 'y', root, rect, at?.y)
      : null,
  }
}

const candidatePosition = (axis, area, rect, align) => {
  if (align === 'none') return null

  const { props } = axis
  const resolved = axis.flipped && align !== 'center'
    ? (align === 'start' ? 'end' : 'start')
    : align
  const start = (rect[props.start] - axis.origin) / axis.scale + axis.scroll - area[props.marginStart]
  const end = (rect[props.end] - axis.origin) / axis.scale + axis.scroll + area[props.marginEnd]
  const startPosition = start - axis.padStart
  const endPosition = end - axis.client + axis.padEnd

  let position = resolved === 'center'
    ? (start + end) / 2 - axis.padStart - axis.snapport / 2
    : resolved === 'end' ? endPosition : startPosition

  // any position where a larger-than-snapport area covers the snapport is a valid snap position
  if (end - start > axis.snapport) {
    position = clamp(axis.position, Math.min(startPosition, endPosition), Math.max(startPosition, endPosition))
  }

  return clamp(position, axis.min, axis.max)
}

const considerArea = (axis, area, rect, align) => {
  const candidate = candidatePosition(axis, area, rect, align)

  if (candidate === null) return

  const distance = Math.abs(candidate - axis.position)

  // ties between equally distant areas go to the first one in document order
  if (!axis.best || distance < axis.best.distance) {
    axis.best = { element: area.element, position: candidate, distance }
  }
}

const applySnapStop = (axis, measured) => {
  const current = clamp(axis.scroll, axis.min, axis.max)
  const forward = axis.position > current
  let stop = null

  if (Math.abs(axis.position - current) <= 1) return

  for (const { area, rect } of measured) {
    if (area.snapStop !== 'always') continue

    const candidate = candidatePosition(axis, area, rect, area[axis.align])

    if (candidate === null) continue

    const passed = forward
      ? candidate > current + 1 && candidate < axis.position
      : candidate < current - 1 && candidate > axis.position

    if (passed && (stop === null || (forward ? candidate < stop : candidate > stop))) stop = candidate
  }

  if (stop !== null) axis.position = stop
}

const evaluate = (container, state, at, stopAtAlways) => {
  if (!container.isConnected || !state.areas) return

  const style = getComputedStyle(container)
  const [snapAxis, strictness = 'proximity'] = style.scrollSnapType.split(' ')

  if (snapAxis === 'none') return

  const { vertical, root, x, y } = createAxes(container, style, at)
  const measured = []

  for (const area of state.areas) {
    const rect = area.element.getBoundingClientRect()

    if (rect.width || rect.height) measured.push({ area, rect })
  }

  for (const axis of [x, y]) {
    if (!axis) continue

    // relative scroll operations stop at the first passed scroll-snap-stop: always position
    if (stopAtAlways) applySnapStop(axis, measured)

    for (const { area, rect } of measured) considerArea(axis, area, rect, area[axis.align])
  }

  for (const axis of [x, y]) {
    // a third of the snapport matches the proximity range observed in Chromium
    if (axis?.best && strictness === 'proximity' && axis.best.distance > axis.snapport / 3) {
      axis.best = null
    }
  }

  const landing = {
    x: x ? (x.best ? x.best.position : clamp(x.position, x.min, x.max)) : undefined,
    y: y ? (y.best ? y.best.position : clamp(y.position, y.min, y.max)) : undefined,
  }
  const snapTargetBlock = (vertical ? x : y)?.best?.element ?? null
  const snapTargetInline = (vertical ? y : x)?.best?.element ?? null

  if (snapTargetBlock === state.snapTargetBlock && snapTargetInline === state.snapTargetInline) {
    state.primed = true

    return landing
  }

  state.snapTargetBlock = snapTargetBlock
  state.snapTargetInline = snapTargetInline

  // the first evaluation only records the snap targets the container starts out with
  if (!state.primed) {
    state.primed = true

    return landing
  }

  const target = root ? container.ownerDocument : container

  target.dispatchEvent(new SnapEvent('scrollsnapchanging', {
    bubbles: root,
    snapTargetBlock,
    snapTargetInline,
  }))

  return landing
}

const getState = (container) => {
  let state = states.get(container)

  if (!state) {
    state = { areas: null, frame: 0, idle: 0, primed: false, stalled: false, pending: null, snapTargetBlock: null, snapTargetInline: null }
    states.set(container, state)
  }

  return state
}

const isSettled = (container, { pending }) => !pending
  || ((pending.x === undefined || Math.abs(pending.x - container.scrollLeft) <= SETTLE_TOLERANCE)
    && (pending.y === undefined || Math.abs(pending.y - container.scrollTop) <= SETTLE_TOLERANCE))

const clearPending = (container, state) => {
  state.pending = null
  pendingContainers.delete(container)
}

const prepare = (container) => {
  const state = getState(container)

  // snap areas are collected once per scrolling sequence
  state.areas ??= getComputedStyle(container).scrollSnapType === 'none' ? [] : collectSnapAreas(container)
  state.stalled = false

  clearTimeout(state.idle)

  const expire = () => {
    if (state.pending) {
      if (isSettled(container, state)) {
        clearPending(container, state)
      }
      // smooth scrolls may start slowly or stutter without emitting scroll events,
      // so a pending operation gets a longer grace period before it is corrected
      else if (!state.stalled) {
        state.stalled = true
        state.idle = setTimeout(expire, IDLE_DELAY * 4)

        return
      }
      else {
        clearPending(container, state)
        evaluate(container, state)
      }
    }

    state.areas = null
  }

  state.idle = setTimeout(expire, IDLE_DELAY)

  return state
}

const handleScroll = ({ target }) => {
  const container = target === document ? document.scrollingElement : target

  if (!container || container.nodeType !== 1) return

  const state = prepare(container)

  if (!state.areas.length) return

  // while a programmatic smooth scroll is in flight its targets are already
  // reported, so scrolling is only watched until it settles at the destination
  if (state.pending) {
    if (isSettled(container, state)) clearPending(container, state)

    return
  }

  // native implementations know the snap targets since the initial layout, so the
  // first observed scroll records the targets at the initial scroll position first
  if (!state.primed) evaluate(container, state, { x: 0, y: 0 })

  if (state.frame) return

  state.frame = requestAnimationFrame(() => {
    state.frame = 0
    evaluate(container, state)
  })
}

const interrupt = ({ isTrusted, target }) => {
  if (!isTrusted || !target?.nodeType) return

  for (const container of pendingContainers) {
    // user input takes over only the containers it can actually scroll — the ones
    // it happened inside of, or every container below a focused ancestor for keys
    if (container !== target && !container.contains(target) && !target.contains(container)) continue

    const state = states.get(container)

    if (state) state.pending = null

    pendingContainers.delete(container)
  }
}

const commitOperation = (container, state, at, stopAtAlways) => {
  if (!state.primed) evaluate(container, state, { x: 0, y: 0 })

  cancelAnimationFrame(state.frame)
  state.frame = 0

  const landing = evaluate(container, state, at, stopAtAlways)

  if (!landing) return

  state.pending = landing
  pendingContainers.add(container)
}

const hookScroll = (container, method, args) => {
  if (!container || container.nodeType !== 1 || !container.isConnected) return

  const previous = states.get(container)

  if (previous?.pending) clearPending(container, previous)

  const options = typeof args[0] === 'object' && args[0] !== null ? args[0] : { left: args[0], top: args[1] }
  const style = getComputedStyle(container)

  if (!isSmooth(style, options.behavior) || style.scrollSnapType.split(' ')[0] === 'none') return

  const relative = method === 'scrollBy'
  const at = {
    x: options.left === undefined ? undefined : (relative ? container.scrollLeft : 0) + options.left,
    y: options.top === undefined ? undefined : (relative ? container.scrollTop : 0) + options.top,
  }

  if (at.x === undefined && at.y === undefined) return

  const state = prepare(container)

  if (state.areas.length) commitOperation(container, state, at, relative)
}

const hookScrollIntoView = (element, arg) => {
  if (!element.isConnected) return

  const options = typeof arg === 'object' && arg !== null ? arg : (arg === false ? { block: 'end' } : {})
  let container = element.parentElement

  while (container && !isScrollContainer(getComputedStyle(container))) container = container.parentElement

  container ??= document.scrollingElement

  if (!container) return

  const previous = states.get(container)

  if (previous?.pending) clearPending(container, previous)

  const style = getComputedStyle(container)

  if (!isSmooth(style, options.behavior) || style.scrollSnapType.split(' ')[0] === 'none') return

  const state = prepare(container)
  const area = state.areas.find(({ element: areaElement }) => areaElement === element || areaElement.contains(element))

  if (!area) return

  const { vertical, x, y } = createAxes(container, style)
  const rect = area.element.getBoundingClientRect()
  const block = options.block ?? 'start'
  const inline = options.inline ?? 'nearest'
  const at = {}

  // a deterministic alignment scrolls to the snap position of the invoked area,
  // while nearest may not scroll at all, so it stays evaluated by position
  if (x && (vertical ? block : inline) !== 'nearest') {
    at.x = candidatePosition(x, area, rect, area[x.align]) ?? undefined
  }

  if (y && (vertical ? inline : block) !== 'nearest') {
    at.y = candidatePosition(y, area, rect, area[y.align]) ?? undefined
  }

  if (at.x === undefined && at.y === undefined) return

  commitOperation(container, state, at)
}

const defineEventHandler = (prototype) => {
  if (!prototype || 'onscrollsnapchanging' in prototype) return

  Object.defineProperty(prototype, 'onscrollsnapchanging', {
    configurable: true,
    enumerable: true,
    get() {
      return this[HANDLER_KEY] ?? null
    },
    set(value) {
      if (this[HANDLER_KEY]) this.removeEventListener('scrollsnapchanging', this[HANDLER_KEY])

      this[HANDLER_KEY] = typeof value === 'function' ? value : null

      if (this[HANDLER_KEY]) this.addEventListener('scrollsnapchanging', this[HANDLER_KEY])
    },
  })
}

const patchScrollMethods = () => {
  for (const method of ['scroll', 'scrollTo', 'scrollBy']) {
    const original = Element.prototype[method]
    const originalWindow = window[method]

    if (original) {
      Element.prototype[method] = function (...args) {
        try {
          hookScroll(this, method, args)
        }
        catch { /* never break scrolling */ }

        return original.apply(this, args)
      }
    }

    if (originalWindow) {
      window[method] = function (...args) {
        try {
          hookScroll(document.scrollingElement, method, args)
        }
        catch { /* never break scrolling */ }

        return originalWindow.apply(window, args)
      }
    }
  }

  const original = Element.prototype.scrollIntoView

  if (original) {
    Element.prototype.scrollIntoView = function (...args) {
      try {
        hookScrollIntoView(this, args[0])
      }
      catch { /* never break scrolling */ }

      return original.apply(this, args)
    }
  }
}

if (!('onscrollsnapchanging' in window)) {
  window.SnapEvent ??= SnapEvent

  for (const { prototype } of [Window, Document, HTMLElement, SVGElement]) defineEventHandler(prototype)

  patchScrollMethods()

  addEventListener('scroll', handleScroll, { capture: true, passive: true })

  // user input takes over a programmatic smooth scroll, so its pending targets are dropped
  for (const type of ['wheel', 'touchstart', 'pointerdown', 'keydown']) {
    addEventListener(type, interrupt, { capture: true, passive: true })
  }
}
