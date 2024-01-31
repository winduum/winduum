/**
 * @param {[]} colors
 * @param {boolean} colorMix
 * @param {boolean} rgb
 * @returns {[]}
 */
export const tailwindColors = (colors = [], colorMix = true, rgb = false) => {
    colors.forEach(name => {
        if (rgb) {
            colors[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`
        }

        colors[name] = colorMix
            ? `color-mix(in var(--space), var(--color-${name}) calc(<alpha-value> * 100%), transparent)`
            : `rgb(var(--color-${name}) / <alpha-value>)`
    })

    return colors
}

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
export const tailwindVariables = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = `var(--${type}-${name})`
    })

    return values
}

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
export const tailwindVariablesFont = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = [`var(--${type}-${name})`, `calc(var(--${type}-${name}) + 0.5rem)`]
    })

    return values
}

/**
 * @param {string} type
 * @param {string[]} variables
 * @returns {Object}
 */
export const tailwindPropertyUtilities = (type, variables = []) => {
    const result = {}

    variables.forEach(name => {
        result[`.${type}-${name}`] = {
            [type]: `var(--${type}-${name})`
        }
    })

    return result
}

/**
 * @param {string[]} values
 * @returns {Object}
 */
export const tailwindAnimations = (values) => {
    const result = {}

    values.forEach(value => {
        result[`.animation-${value}`] = {
            'animation-name': value
        }
    })

    return result
}
