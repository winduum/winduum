import plugin from 'tailwindcss/plugin'
import twColors from 'tailwindcss/colors'
import lodash from 'lodash'

export const defaultConfig = {
    colors: [
        'light', 'dark', 'primary',
        'warning', 'error', 'info', 'success', 'accent', 'current',
        'base', 'base-primary', 'base-secondary', 'base-tertiary',
        'body', 'body-primary', 'body-secondary', 'body-tertiary'
    ],
    fontFamily: ['primary', 'secondary'],
    fontWeight: ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold'],
    zIndex: [10, 20, 30, 40, 50, 60],
    fontSize: ['xs', 'sm', 'root', 'md', 'lg', 'xl', '2xl', '3xl', '3xl', '4xl', '5xl', '6xl', '7xl', '7xl', '8xl', '9xl'],
    spacing: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'section'],
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    animations: ['fade-in', 'fade-out', 'fade-in-down', 'fade-out-up', 'ripple', 'spin', 'move-indeterminate'],
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
    }
}

export const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (m, r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))

export const getTailwindColors = (twColors) => {
    const accentColors = []

    Object.keys(twColors).forEach(color => {
        if (color.match(/(lightBlue|warmGray|trueGray|coolGray|blueGray)/)) {
            return
        }

        if (typeof twColors[color] === 'object') {
            Object.keys(twColors[color]).forEach(variant => {
                accentColors.push([`${color.replace(/[A-Z]/g, m => '-' + m.toLowerCase())}-${variant}`, twColors[color][variant]])
            })
        } else {
            accentColors.push([color, twColors[color]])
        }
    })

    return accentColors
}

export const tailwindColors = (colors = []) => {
    colors.forEach(name => {
        colors[name + '-rgb'] = ({ opacityValue }) => {
            if (opacityValue === undefined) {
                return `rgb(var(--color-${name}-rgb))`
            }
            return `rgb(var(--color-${name}-rgb) / ${opacityValue})`
        }

        colors[name] = ({ opacityValue }) => {
            if (opacityValue === undefined) {
                return `var(--color-${name})`
            }

            return `color-mix(in sRGB, var(--color-${name}) calc(${opacityValue} * 100%), transparent)`
        }
    })

    return colors
}

export const tailwindColorsAccent = (colors = []) => {
    const result = {}

    colors.forEach(color => {
        if (Array.isArray(color)) {
            const rgb = hexToRgb(color[1])

            result[`.accent-${color[0]}`] = {
                '--color-accent-rgb': `${rgb[0]} ${rgb[1]} ${rgb[2]}`,
                '--color-accent': `rgb(${rgb[0]} ${rgb[1]} ${rgb[2]})`,
                '--color-accent-current': `var(--color-${color}-current, var(--color-light))`
            }
        } else {
            result[`.accent-${color}`] = {
                '--color-accent-rgb': `var(--color-${color}-rgb)`,
                '--color-accent': `var(--color-${color})`,
                '--color-accent-current': `var(--color-${color}-current, var(--color-light))`
            }
        }
    })

    return result
}

export const tailwindColorsCurrent = (colors = []) => {
    const result = {}

    colors.forEach(color => {
        if (Array.isArray(color)) {
            const rgb = hexToRgb(color[1])

            result[`.text-${color[0]}`] = {
                '--color-current': `${rgb[0]} ${rgb[1]} ${rgb[2]}`
            }
        } else {
            result[`.text-${color}`] = {
                '--color-current': `var(--color-${color})`
            }
        }
    })

    return result
}

export const tailwindVariables = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = `var(--${type}-${name})`
    })

    return values
}

export const tailwindVariablesFont = (type, variables = [], values = {}) => {
    variables.forEach(name => {
        values[name] = [`var(--${type}-${name})`, `calc(var(--${type}-${name}) + 0.5rem)`]
    })

    return values
}

export const tailwindAnimations = (values) => {
    const result = {}

    values.forEach(value => {
        result[`.animation-${value}`] = {
            'animation-name': value
        }
    })

    return result
}

export const createPlugin = (userConfig = {}) => {
    userConfig = lodash.merge(defaultConfig, userConfig)

    return plugin(({ addUtilities, theme, variants, e }) => {
        addUtilities(Object.assign(tailwindColorsAccent(getTailwindColors(twColors)), tailwindColorsAccent(userConfig.colors)))
        addUtilities(Object.assign(tailwindColorsCurrent(getTailwindColors(twColors)), tailwindColorsCurrent(userConfig.colors)))
        addUtilities(tailwindAnimations(userConfig.animations))
        addUtilities([
            Object.entries(theme('spacing')).map(([key, value]) => {
                return {
                    [`.${e(`sq-${key}`)}`]: {
                        width: value,
                        height: value
                    }
                }
            })
        ], variants('sq'))
    }, {
        corePlugins: {
            preflight: false,
            container: false
        },
        theme: {
            fontSize: {
                base: undefined
            },
            extend: {
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
