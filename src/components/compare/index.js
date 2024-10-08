/**
 * @param {HTMLInputElement} element
 * @param {import("./").SetPositionOptions} options
 * @returns void
 */
export const setPosition = (element, options = {}) => {
    const { selector, positionProperty } = {
        selector: '.x-compare',
        positionProperty: '--x-compare-position',
        ...options
    }

    element?.closest(selector)?.style.setProperty(positionProperty, `${element.value}%`)
}

/**
 * @param {HTMLInputElement} element
 * @param {string} key
 * @param {string} step
 * @returns void
 */
export const setKeyboardStep = (element, key, step = '10') => {
    if (key?.toLowerCase() !== 'arrowright' && key?.toLowerCase() !== 'arrowleft') return

    element.step = step
}

/**
 * @param {HTMLInputElement} element
 * @param {string} step
 * @returns void
 */
export const setMouseStep = (element, step = '0.1') => {
    element.step = step
}
