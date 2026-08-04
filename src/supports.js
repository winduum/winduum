/**
 * @type {boolean}
 */
export const supportsAnchor = CSS.supports('anchor-name', '--')

/**
 * @type {boolean}
 */
export const supportsAnchoredContainer = CSS.supports('container-type: anchored')

/**
 * @type {boolean}
 */
export const supportsTimelineTrigger = CSS.supports('timeline-trigger-name: --v')

/**
 * @type {boolean}
 */
export const supportsInterestFor = Object.prototype.hasOwnProperty.call(HTMLButtonElement.prototype, 'interestForElement')

/**
 * @type {boolean}
 */
export const supportsScrollInitialTarget = CSS.supports('scroll-initial-target', 'nearest')

/**
 * @type {boolean}
 */
export const supportsAnimationTimeline = CSS.supports('animation-timeline: scroll()')

/**
 * @type {boolean}
 */
export const supportsScrollSnapEvents = ('onscrollsnapchanging' in window)
