/**
 * @param {HTMLElement} element
 * @param {boolean} vertical
 * @returns {{ position: number, always: boolean }[]}
 */
const getSnapPositions = (element, vertical) => {
  const elementRect = element.getBoundingClientRect()
  const scrollPosition = vertical ? element.scrollTop : element.scrollLeft
  const clientSize = vertical ? element.clientHeight : element.clientWidth
  const maxScroll = (vertical ? element.scrollHeight : element.scrollWidth) - clientSize

  return [...element.children]
    .map((child) => {
      const childRect = child.getBoundingClientRect()
      const start = (vertical ? childRect.top - elementRect.top : childRect.left - elementRect.left) + scrollPosition
      const size = vertical ? childRect.height : childRect.width
      const { scrollSnapAlign, scrollSnapStop } = getComputedStyle(child)
      const align = scrollSnapAlign.split(' ').at(vertical ? 0 : -1)

      if (align === 'none') return null

      const position = align === 'end'
        ? start + size - clientSize
        : align === 'center'
          ? start + (size - clientSize) / 2
          : start

      return {
        position: Math.max(0, Math.min(position, maxScroll)),
        always: scrollSnapStop === 'always',
      }
    })
    .filter(snapPosition => snapPosition !== null)
}

/**
 * @param {HTMLElement} element
 * @param {object} options
 * @param {number} [options.direction=1]
 * @param {boolean} [options.vertical=false]
 * @param {number} [options.ratio=0.85]
 * @returns void
 */
export const scrollBy = (element, { direction = 1, vertical = false, ratio = 0.85 }) => {
  const { distance, position } = vertical
    ? {
        distance: element.clientHeight * ratio,
        position: 'top',
      }
    : {
        distance: element.clientWidth * ratio,
        position: 'left',
      }

  /* Safari does not snap after programmatic scrolls — browsers with native
     scroll snap events are the ones that do, others get the exact snap offset */
  if (!('onscrollsnapchanging' in window)) {
    const scrollPosition = vertical ? element.scrollTop : element.scrollLeft
    const targetPosition = scrollPosition + distance * direction
    const passes = snapPosition => direction > 0 ? snapPosition.position > scrollPosition + 1 : snapPosition.position < scrollPosition - 1
    const closer = (a, b) => direction > 0 ? a.position < b.position : a.position > b.position
    const snapPositions = getSnapPositions(element, vertical).filter(passes)

    if (snapPositions.length) {
      let target = snapPositions.reduce((closest, current) =>
        Math.abs(current.position - targetPosition) < Math.abs(closest.position - targetPosition) ? current : closest,
      )

      /* scroll-snap-stop: always must not be passed over */
      const stop = snapPositions.reduce((first, current) =>
        current.always && (!first || closer(current, first)) ? current : first, null)

      if (stop && closer(stop, target)) target = stop

      element.scrollTo({
        [position]: target.position,
      })

      return
    }
  }

  element.scrollBy({
    [position]: distance * direction,
  })
}

/**
 * @param {HTMLElement} element
 * @param {object} options
 * @param {HTMLButtonElement | null} [options.prevElement]
 * @param {HTMLButtonElement | null} [options.nextElement]
 * @param {boolean} vertical
 * @returns void
 */
export const toggleScrollState = (element, { prevElement, nextElement, vertical = false }) => {
  const { scrollStart, scrollEnd, scrollNone } = vertical
    ? {
        scrollStart: element.scrollTop <= 0,
        scrollEnd: element.scrollTop >= element.scrollHeight - element.clientHeight,
        scrollNone: !(element.scrollHeight - element.clientHeight),
      }
    : {
        scrollStart: element.scrollLeft <= 0,
        scrollEnd: element.scrollLeft >= element.scrollWidth - element.clientWidth,
        scrollNone: !(element.scrollWidth - element.clientWidth),
      }

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
export const setCurrentAttribute = (element, index, attributeName = 'aria-current') => {
  element.querySelector(`[${attributeName}]`)?.removeAttribute(attributeName)
  element.children[index].setAttribute(attributeName, 'true')
}

/**
 * @param {HTMLElement & { _markerIndex?: number | null }} element
 * @param {HTMLElement} target
 * @param {HTMLElement | null} markerGroupElement
 * @returns void
 */
export const setSnappedAttribute = (element, target, markerGroupElement) => {
  const snappedIndex = [...element.children].indexOf(target)

  setCurrentAttribute(element, snappedIndex, 'data-snapped')

  if (markerGroupElement) {
    const markerTarget = markerGroupElement.querySelector(`[href="#${target.id}"]`)
    const index = element._markerIndex ?? (markerTarget && [...markerGroupElement.children].indexOf(markerTarget)) ?? snappedIndex

    setCurrentAttribute(markerGroupElement, index)

    element._markerIndex = null
  }
}

/**
 * @param {HTMLElement & { _markerIndex?: number | null }} element
 * @param {HTMLElement | HTMLLinkElement} target
 * @param {HTMLElement} markerGroupElement
 * @param {ScrollIntoViewOptions} scrollIntoViewOptions
 * @returns void
 */
export const scrollToMarker = (element, target, markerGroupElement, scrollIntoViewOptions = {}) => {
  const snappedTarget = document.getElementById(target.getAttribute('href').slice(1))
  const markerTargetIndex = [...markerGroupElement.children].indexOf(target)
  const index = snappedTarget ? [...element.children].indexOf(snappedTarget) : markerTargetIndex

  element._markerIndex = markerTargetIndex

  setCurrentAttribute(markerGroupElement, markerTargetIndex)

  element.children[index]?.scrollIntoView({
    inline: 'start',
    block: 'nearest',
    container: 'nearest',
    ...scrollIntoViewOptions,
  })
}
