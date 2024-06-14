/**
 * @param {Event & { currentTarget: HTMLElement | Element }} event
 * @param {import("./").SetPositionOptions} options
 * @returns void
 */
export const setPosition = ({ currentTarget }, options = {}) => {
    const { selector, positionProperty } = {
        selector: '.compare',
        positionProperty: '--compare-position',
        ...options
    }

    currentTarget?.closest(selector)?.style.setProperty(positionProperty, `${currentTarget.value}%`)
}

/**
 * @param {KeyboardEvent & { currentTarget: HTMLInputElement | EventTarget }} event
 * @param {string} step
 * @returns void
 */
export const setKeyboardStep = ({ key, currentTarget }, step = '10') => {
    if (key?.toLowerCase() !== 'arrowright' && key?.toLowerCase() !== 'arrowleft') return

    currentTarget.step = step
}

/**
 * @param {MouseEvent & { currentTarget: HTMLInputElement | EventTarget }} event
 * @param {string} step
 * @returns void
 */
export const setMouseStep = ({ currentTarget }, step = '0.1') => {
    currentTarget.step = step
}
