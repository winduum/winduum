/**
 * @param {import("./compare").Position} event
 * @param {import("./compare").PositionOptions} options
 */
export const setPosition = ({ currentTarget }, options = {}) => {
    const { selector, propertyName } = {
        selector: '.c-compare',
        propertyName: '--c-compare-position',
        ...options
    }

    currentTarget.closest(selector).style.setProperty(propertyName, `${currentTarget.value}%`)
}

/**
 * @param {import("./compare").KeyboardStep} event
 * @param {Number} step
 */
export const setKeyboardStep = ({ key, currentTarget }, step = 10) => {
    if (key?.toLowerCase() !== 'arrowright' && key?.toLowerCase() !== 'arrowleft') return

    currentTarget.step = step
}

/**
 * @param {import("./compare").MouseStep} event
 * @param {Number} step
 */
export const setMouseStep = ({ currentTarget }, step = 0.1) => {
    currentTarget.step = step
}
