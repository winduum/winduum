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

  element.scrollBy({
    [position]: (distance ?? element.clientWidth * ratio) * direction,
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
