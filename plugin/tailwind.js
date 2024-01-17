import plugin from 'tailwindcss/plugin'
import withAlphaVariable from 'tailwindcss/src/util/withAlphaVariable'
import flattenColorPalette from 'tailwindcss/src/util/flattenColorPalette'
import toColorValue from 'tailwindcss/src/util/toColorValue'

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
        rgb: false,
        colorMix: true
    }
}

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

export const tailwindPropertyUtilities = (type, variables = []) => {
    const result = {}

    variables.forEach(name => {
        result[`.${type}-${name}`] = {
            [type]: `var(--${type}-${name})`
        }
    })

    return result
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
    userConfig = {
        ...defaultConfig,
        ...userConfig
    }

    return plugin(({ addUtilities, addComponents, matchUtilities, theme, e, corePlugins }) => {
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
                text: (value) => {
                    const matchValue = toColorValue(value).match(/var\((.*?)\)/)
                    const fallbackRgb = matchValue && matchValue[0].includes('-rgb')

                    const colorProperties = {}

                    if (fallbackRgb) {
                        colorProperties['--color-current-rgb'] = matchValue[0]
                    }

                    if ((matchValue && matchValue[0] === 'var(--color-current)') || (matchValue && matchValue[0] === 'var(--color-current-rgb)')) {
                        return {
                            color: toColorValue(value)
                        }
                    }

                    const color = {
                        ...withAlphaVariable({
                            color: value,
                            property: 'color',
                            variable: '--tw-text-opacity'
                        })
                    }

                    if (!corePlugins('textOpacity')) {
                        return {
                            ...colorProperties,
                            '--color-current': toColorValue(value),
                            ...color
                        }
                    }

                    return {
                        ...colorProperties,
                        ...withAlphaVariable({
                            color: value,
                            property: '--color-current',
                            variable: '--tw-text-opacity'
                        }),
                        ...color
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
            '.flex-center': {
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)'
            },
            '.flex-between': {
                display: 'flex',
                justifyContent: 'space-between',
                gap: 'var(--spacing-sm)'
            },
            '.dot': {
                '--tw-bg-opacity': '1',
                display: 'inline-flex',
                width: '0.625rem',
                height: '0.625rem',
                borderRadius: 'var(--rounded-full)',
                backgroundColor: 'color-mix(in srgb, var(--color-accent) calc(var(--tw-bg-opacity) * 100%), transparent)',
                flexShrink: '0'
            }
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
