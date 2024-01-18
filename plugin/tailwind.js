import plugin from 'tailwindcss/plugin'
import withAlphaVariable from 'tailwindcss/src/util/withAlphaVariable'
import flattenColorPalette from 'tailwindcss/src/util/flattenColorPalette'
import toColorValue from 'tailwindcss/src/util/toColorValue'
import FlexUtility from './utilities/flex.js'
import DotUtility from './utilities/dot.js'

/**
 * @type {import('./tailwind').PluginOptions} options.
 */
export const defaultConfig = {
    colors: [
        'primary', 'accent', 'current',
        'warning', 'error', 'info', 'success', 'light', 'dark',
        'main', 'main-primary', 'main-secondary', 'main-tertiary',
        'body', 'body-primary', 'body-secondary', 'body-tertiary',
        'primary-foreground', 'accent-foreground', 'current-foreground',
        'warning-foreground', 'error-foreground', 'info-foreground', 'success-foreground', 'light-foreground', 'dark-foreground',
        'main-foreground', 'main-primary-foreground', 'main-secondary-foreground', 'main-tertiary-foreground',
        'body-foreground', 'body-primary-foreground', 'body-secondary-foreground', 'body-tertiary-foreground'
    ],
    fontFamily: ['primary', 'secondary'],
    fontWeight: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    ease: ['linear', 'in', 'out', 'in-out'],
    zIndex: [10, 20, 30, 40, 50, 60],
    fontSize: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '3xl', '4xl', '5xl', '6xl', '7xl', '7xl', '8xl', '9xl'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl'],
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    animations: ['fade-in', 'fade-out', 'fade-in-down', 'fade-out-up', 'ripple', 'spin', 'move-indeterminate'],
    mask: ['check', 'radio', 'angle-up', 'angle-down'],
    screens: {
        xs: '22.5em',
        sm: '26em',
        md: '48em',
        lg: '60em',
        xl: '76em',
        '2xl': '82em',
        '3xl': '88em',
        '4xl': '100em',
        xxl: '126em',
        '2xxl': '158em'
    },
    settings: {
        rgb: true,
        colorMix: true
    }
}

/**
 * @param {[]} colors
 * @returns {[]}
 */
export const tailwindColors = (colors = []) => {
    colors.forEach(name => {
        if (defaultConfig.settings.rgb) {
            colors[name + '-rgb'] = `rgb(var(--color-${name}-rgb) / <alpha-value>)`
        }

        colors[name] = defaultConfig.settings.colorMix
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

/**
 * @param {import('./tailwind').PluginOptions} userConfig
 */
export const createPlugin = (userConfig = {}) => {
    userConfig = {
        ...defaultConfig,
        ...userConfig
    }

    return plugin(({ addComponents, matchUtilities, theme, e, corePlugins }) => {
        matchUtilities(
            {
                accent: (value) => {
                    const matchValue = toColorValue(value).match(/var\((--color-.*?)\)/)
                    const fallbackRgb = matchValue && matchValue[0].includes('-rgb')

                    const colorProperties = {}

                    if (fallbackRgb) {
                        colorProperties['--color-accent-rgb'] = matchValue[0]
                    }

                    if ((matchValue && matchValue[0] === 'var(--color-accent)') || (matchValue && matchValue[0] === 'var(--color-accent-rgb)')) {
                        return {
                            'accent-color': matchValue && toColorValue(value).includes('calc(1 * 100%)') ? matchValue[0] : toColorValue(value)
                        }
                    }

                    if (matchValue) {
                        if (fallbackRgb) {
                            colorProperties['--color-accent-foreground-rgb'] = `var(${matchValue[1].replace('-rgb', '-foreground-rgb')})`
                        }

                        if (toColorValue(value).includes('calc(1 * 100%)') || toColorValue(value).includes(' / 1')) {
                            return {
                                ...colorProperties,
                                '--color-accent': fallbackRgb ? toColorValue(value) : matchValue[0],
                                '--color-accent-foreground': fallbackRgb ? `rgb(var(${matchValue[1].replace('-rgb', '-foreground-rgb')}, var(--color-light-rgb)))` : `var(${matchValue[1]}-foreground, var(--color-light))`,
                                'accent-color': defaultConfig.settings.colorMix ? 'var(--color-accent)' : 'rgb(var(--color-accent))'
                            }
                        } else {
                            return {
                                ...colorProperties,
                                '--color-accent': toColorValue(value),
                                '--color-accent-foreground': fallbackRgb ? `rgb(var(${matchValue[1].replace('-rgb', '-foreground-rgb')}, var(--color-light-rgb)))` : `var(${matchValue[1]}-foreground, var(--color-light))`,
                                'accent-color': defaultConfig.settings.colorMix ? 'var(--color-accent)' : 'rgb(var(--color-accent))'
                            }
                        }
                    }

                    return {
                        '--color-accent': toColorValue(value),
                        'accent-color': 'var(--color-accent)'
                    }
                }
            },
            { values: flattenColorPalette(theme('accentColor')), type: ['color', 'any'] }
        )
        matchUtilities(
            {
                text: value => {
                    const matchValue = toColorValue(value).match(/var\((--color-.*?)\)/)
                    const withCurrentRgb = {}

                    if (matchValue && defaultConfig.settings.rgb) {
                        withCurrentRgb['--tw-text-current-rgb'] = matchValue[1].includes('rgb') ? matchValue[0] : `var(${matchValue[1]}-rgb)`
                    }

                    if (!corePlugins('textOpacity')) {
                        return {
                            ...withCurrentRgb,
                            color: toColorValue(value)
                        }
                    }

                    return {
                        ...withCurrentRgb,
                        ...withAlphaVariable({
                            color: value,
                            property: 'color',
                            variable: '--tw-text-opacity'
                        })
                    }
                }
            },
            { values: flattenColorPalette(theme('textColor')), type: ['color', 'any'] }
        )
        addComponents(tailwindAnimations(userConfig.animations))
        addComponents(tailwindPropertyUtilities('mask', userConfig.mask))
        addComponents([
            Object.entries(theme('spacing')).map(([key, value]) => {
                return {
                    [`.${e(`divide-gap-x-${key}`)}`]: {
                        '& > :where(*:not(:first-child))': {
                            paddingLeft: value,
                            marginLeft: value
                        }
                    },
                    [`.${e(`divide-gap-y-${key}`)}`]: {
                        '& > :where(*:not(:first-child))': {
                            paddingTop: value,
                            marginTop: value
                        }
                    }
                }
            })
        ])
        addComponents({
            ...FlexUtility,
            ...DotUtility
        })
    }, {
        corePlugins: {
            preflight: false,
            textColor: false,
            accentColor: false
        },
        theme: {
            extend: {
                transitionProperty: {
                    DEFAULT: 'var(--transition)'
                },
                transitionDuration: {
                    DEFAULT: 'var(--duration)'
                },
                transitionTimingFunction: tailwindVariables('ease', userConfig.ease),
                colors: tailwindColors(userConfig.colors),
                fontSize: tailwindVariablesFont('text', userConfig.fontSize),
                fontFamily: tailwindVariables('font', userConfig.fontFamily),
                fontWeight: tailwindVariables('font', userConfig.fontWeight),
                zIndex: tailwindVariables('z', userConfig.zIndex, {
                    0: 0,
                    auto: 'auto'
                }),
                spacing: tailwindVariables('spacing', userConfig.spacing),
                borderRadius: tailwindVariables('rounded', userConfig.borderRadius, {
                    DEFAULT: 'var(--rounded)'
                }),
                screens: userConfig.screens
            }
        }
    })
}

export default createPlugin
