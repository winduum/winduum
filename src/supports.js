/**
 * @type {boolean}
 */
export const supportsTimelineTrigger = CSS.supports('timeline-trigger-name: --v')

/**
 * @type {boolean}
 */
export const supportsInterestFor = Object.prototype.hasOwnProperty.call(HTMLButtonElement.prototype, 'interestForElement')
