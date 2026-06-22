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
