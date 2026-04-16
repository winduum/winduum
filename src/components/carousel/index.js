/**
 * @param {HTMLElement} element
 * @param {object} options
 * @param {number} [options.direction=1]
 * @param {number} [options.distance]
 * @param {'left' | 'top'} [options.position='left']
 * @param {number} [options.ratio=0.85]
 * @returns void
 */
export const scrollBy = (element, { direction = 1, distance, position = 'left', ratio = 0.85 }) => {
  distance ??= element.clientWidth * ratio

  element.scrollBy({
    [position]: distance * direction,
  })
}

/**
 * @param {HTMLElement} element
 * @param {object} options
 * @param {HTMLButtonElement | null} [options.prevElement]
 * @param {HTMLButtonElement | null} [options.nextElement]
 * @param {boolean} [options.scrollStart]
 * @param {boolean} [options.scrollEnd]
 * @param {boolean} [options.scrollNone]
 * @returns void
 */
export const toggleScrollState = (element, { prevElement, nextElement, scrollStart, scrollEnd, scrollNone }) => {
  scrollStart ??= element.scrollLeft <= 0
  scrollEnd ??= element.scrollLeft >= element.scrollWidth - element.clientWidth
  scrollNone ??= element.scrollWidth - element.clientWidth === 0

  if (prevElement) prevElement.disabled = scrollStart
  if (nextElement) nextElement.disabled = scrollEnd

  element.toggleAttribute('data-scroll-start', scrollStart)
  element.toggleAttribute('data-scroll-end', scrollEnd)
  element.toggleAttribute('data-scroll-none', scrollNone)
}

/**
 * @param {HTMLElement} element
 * @param {number} index
 * @param {string} [attributeName='data-current']
 * @returns void
 */
export const setCurrentAttribute = (element, index, attributeName = 'data-current') => {
  [...element.children].forEach(el => el.removeAttribute(attributeName))
  element.children[index].setAttribute(attributeName, '')
}

/**
 * @param {HTMLElement & { _markerIndex?: number | null }} element
 * @param {HTMLElement} target
 * @param {HTMLElement | null} markerGroupElement
 * @returns number
 */
export const setSnappedAttribute = (element, target, markerGroupElement) => {
  const snappedIndex = [...element.children].indexOf(target)
  const index = element._markerIndex ?? snappedIndex

  setCurrentAttribute(element, snappedIndex, 'data-snapped')

  if (markerGroupElement) setCurrentAttribute(markerGroupElement, index)

  element._markerIndex = null

  return index
}

/**
 * @param {HTMLElement & { _markerIndex?: number | null }} element
 * @param {HTMLElement} target
 * @param {HTMLElement} markerGroupElement
 * @returns number
 */
export const scrollToMarker = (element, target, markerGroupElement) => {
  const index = [...markerGroupElement.children].indexOf(target)

  element._markerIndex = index

  setCurrentAttribute(markerGroupElement, index)

  element.children[index]?.scrollIntoView({
    inline: 'start',
    block: 'nearest',
  })

  return index
}

/**
 * @param {HTMLElement | Element} element
 * @param {import("./").AutoplayCarouselOptions} options
 * @returns void
 */
export const autoplayCarousel = (element, options = {}) => {
  options = {
    delay: 4000,
    pauseElements: [],
    ...options,
  }

  let paused

  options.pauseElements.forEach((element) => {
    element?.addEventListener('mouseenter', () => (paused = true))
    element?.addEventListener('mouseleave', () => (paused = false))
  })

  setInterval(() => {
    if (paused) return

    // TODO vertical support
    if (element.scrollLeft < element.scrollWidth - element.clientWidth) {
      scrollBy(1)
    }
    else {
      // TODO
      element.scrollTo(0, 0)
    }
  }, options.delay)
}

/**
 * @param {HTMLElement | Element & { _activeIndex: number }} element
 * @param {import("./").DragCarouselOptions} options
 * @returns void
 */
export const dragCarousel = (element, options = {}) => {
  options = {
    activeAttribute: 'data-grabbing',
    ...options,
  }

  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) {
    return
  }

  let isDown
  let startX
  let scrollLeft
  let timeout

  const endGrabbing = () => {
    isDown = false
    element.removeAttribute(options.activeAttribute)

    // TODO
    // scrollTo(element, element._activeIndex)

    clearTimeout(timeout)

    timeout = setTimeout(() => {
      element.style.scrollSnapType = ''
    }, 300)
  }

  element.addEventListener('mouseleave', endGrabbing)

  element.addEventListener('mouseup', endGrabbing)

  element.addEventListener('mousedown', ({ pageX }) => {
    isDown = true
    startX = pageX - element.offsetLeft
    scrollLeft = element.scrollLeft
  })

  element.addEventListener('mousemove', (e) => {
    if (!isDown) return
    e.preventDefault()

    const x = e.pageX - element.offsetLeft

    element.setAttribute(options.activeAttribute, '')
    element.style.scrollSnapType = 'unset'
    element.scroll({ left: scrollLeft - ((x - startX) * 1.25), behavior: 'instant' })
    element.ondragstart = e => e.preventDefault()
  })
}
