/**
 * @param {import("./types/index").Position} event
 * @param {import("./types/index").PositionOptions} options
 * @returns void
 */
export const setPosition = ({ currentTarget }, options = {}) => {
    const { selector, positionProperty } = {
        selector: '.c-compare',
        positionProperty: '--c-compare-position',
        ...options
    }

    currentTarget.closest(selector).style.setProperty(positionProperty, `${currentTarget.value}%`)
}

/**
 * @param {import("./types/index").KeyboardStep} event
 * @param {Number} step
 * @returns void
 */
export const setKeyboardStep = ({ key, currentTarget }, step = 10) => {
    if (key?.toLowerCase() !== 'arrowright' && key?.toLowerCase() !== 'arrowleft') return

    currentTarget.step = step
}

/**
 * @param {import("./types/index").MouseStep} event
 * @param {Number} step
 * @returns void
 */
export const setMouseStep = ({ currentTarget }, step = 0.1) => {
    currentTarget.step = step
}

export default {
    setPosition,
    setKeyboardStep,
    setMouseStep
}
