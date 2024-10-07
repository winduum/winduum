import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * @param {[]} colors
 * @param {boolean} colorMix
 * @param {boolean} rgb
 * @returns {Object}
 */
export const tailwindColors = (colors = [], colorMix = true, rgb = false) => {
    const result = {
        current: 'color-mix(in var(--default-color-space), currentcolor calc(<alpha-value> * 100%), var(--default-color-mix, transparent))'
    }

    colors.forEach((name) => {
        if (rgb) {
            result[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`
        }

        result[name] = colorMix
            ? `color-mix(in var(--default-color-space), var(--color-${name}) calc(<alpha-value> * 100%), var(--default-color-mix, transparent))`
            : `rgb(var(--color-${name}) / <alpha-value>)`
    })

    return result
}

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
export const tailwindVariables = (type, variables = [], values = {}) => {
    variables.forEach((name) => {
        values[name] = `var(--${type}-${name.replace(/\./g, '_')})`
    })

    return values
}

export const tailwindParseVariables = (type, file) => {
    const fileContent = readFileSync(resolve(process.cwd(), file)).toString()

    const regex = /(--[\w-]+):\s*([^;]+);/g
    const matches = [...fileContent.matchAll(regex)]
    const values = {}

    matches.forEach((match) => {
        if (!match[1].startsWith(`--${type}-`)) {
            return
        }

        const name = match[1].replace(`--${type}-`, '')
        const value = match[2]

        values[name.replace(/_/g, '.')] = `var(--${type}-${name}, ${value})`
    })

    console.log(values)

    return values
}

/**
 * @param {string} type
 * @param {string[]} variables
 * @param {Object} values
 * @returns {Object}
 */
export const tailwindVariablesFont = (type, variables = [], values = {}) => {
    variables.forEach(({ value, initial }) => {
        values[value] = [`var(--${type}-${value}, ${initial})`, `calc(var(--${type}-${value}) + 0.5rem)`]
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

    variables.forEach((name) => {
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

    values.forEach((value) => {
        result[`.animation-${value}`] = {
            'animation-name': value
        }
    })

    return result
}
