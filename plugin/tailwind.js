import plugin from 'tailwindcss/plugin'
import flattenColorPalette from 'tailwindcss/src/util/flattenColorPalette'
import FlexUtility from './utilities/flex.js'
import DotUtility from './utilities/dot.js'
import divideGap from './utilities/divide-gap.js'
import { accentColor, textColor } from './utilities/color.js'
import { tailwindAnimations, tailwindColors, tailwindPropertyUtilities, tailwindVariables, tailwindVariablesFont } from './utilities/common.js'

/**
 * @type {import('./tailwind').PluginOptions} options.
 */
export const defaultConfig = {
    colors: [
        'primary', 'accent',
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
    zIndex: ['10', '20', '30', '40', '50', '60'],
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

/**
 * @param {import('./tailwind').PluginOptions} userConfig
 */
export const createPlugin = (userConfig = {}) => {
    const settings = {
        ...defaultConfig.settings,
        ...userConfig.settings
    }

    userConfig = {
        ...defaultConfig,
        ...userConfig,
        settings
    }

    return plugin(({ addComponents, matchUtilities, theme, e, corePlugins }) => {
        matchUtilities(
            {
                accent: value => accentColor({ value }, userConfig.settings)
            },
            { values: flattenColorPalette(theme('accentColor')), type: ['color', 'any'] }
        )
        matchUtilities(
            {
                text: value => textColor({ value, corePlugins }, userConfig.settings)
            },
            { values: flattenColorPalette(theme('textColor')), type: ['color', 'any'] }
        )
        addComponents(tailwindAnimations(userConfig.animations))
        addComponents(tailwindPropertyUtilities('mask', userConfig.mask))
        addComponents(divideGap({ theme, e }))
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
                colors: tailwindColors(userConfig.colors, settings.colorMix, settings.rgb),
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

export { tailwindAnimations, tailwindColors, tailwindPropertyUtilities, tailwindVariables, tailwindVariablesFont }

export default createPlugin
