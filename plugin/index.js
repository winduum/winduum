import plugin from 'tailwindcss/plugin'
import flattenColorPalette from 'tailwindcss/src/util/flattenColorPalette'
import divideGap from './utilities/divide-gap.js'
import { accentColor, textColor } from './utilities/color.js'
import {
    tailwindAnimations,
    tailwindColors,
    tailwindParseVariables,
    tailwindPropertyUtilities,
    tailwindVariables,
    tailwindVariablesFont
} from './utilities/common.js'

/**
 * @type {import('./').PluginOptions} options.
 */
export const defaultConfig = {
    colors: [
        'primary', 'accent',
        'warning', 'error', 'info', 'success', 'light', 'dark',
        'main', 'main-primary', 'main-secondary', 'main-tertiary',
        'body', 'body-primary', 'body-secondary', 'body-tertiary',
        'primary-foreground', 'accent-foreground',
        'warning-foreground', 'error-foreground', 'info-foreground', 'success-foreground', 'light-foreground', 'dark-foreground',
        'main-foreground', 'main-primary-foreground', 'main-secondary-foreground', 'main-tertiary-foreground',
        'body-foreground', 'body-primary-foreground', 'body-secondary-foreground', 'body-tertiary-foreground'
    ],
    fontFamily: './src/theme/config/font.css',
    fontWeight: './src/theme/config/font.css',
    ease: ['linear', 'in', 'out', 'in-out'],
    zIndex: ['10', '20', '30', '40', '50', '60'],
    fontSize: './src/theme/config/font.css',
    spacing: './src/theme/config/spacing.css',
    borderRadius: ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', 'full'],
    animations: ['ripple', 'spin', 'move-indeterminate'],
    mask: ['check', 'radio', 'angle-up', 'angle-down'],
    screens: {
        'xs': '22.5rem',
        'sm': '26rem',
        'md': '46.5rem',
        'lg': '60rem',
        'xl': '76rem',
        '2xl': '82rem',
        '3xl': '88rem',
        '4xl': '100rem',
        'xxl': '126rem',
        '2xxl': '158rem'
    },
    settings: {
        rgb: false,
        colorMix: true
    }
}

/**
 * @param {import('./').PluginOptions} userConfig
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
    }, {
        corePlugins: {
            preflight: false,
            textColor: false,
            accentColor: false
        },
        theme: {
            extend: {
                transitionProperty: {
                    DEFAULT: 'var(--default-transition-property)'
                },
                transitionDuration: {
                    DEFAULT: 'var(--default-transition-duration)'
                },
                transitionTimingFunction: tailwindVariables('transition-timing-function', userConfig.ease),
                colors: tailwindColors(userConfig.colors, settings.colorMix, settings.rgb),
                fontSize: tailwindParseVariables('font-size', userConfig.fontSize),
                fontFamily: tailwindParseVariables('font-family', userConfig.fontFamily),
                fontWeight: tailwindParseVariables('font-weight', userConfig.fontWeight),
                zIndex: tailwindVariables('z-index', userConfig.zIndex, {
                    0: 0,
                    auto: 'auto'
                }),
                spacing: tailwindParseVariables('spacing', userConfig.spacing),
                borderRadius: tailwindVariables('radius', userConfig.borderRadius, {
                    DEFAULT: 'var(--radius)'
                }),
                screens: userConfig.screens
            }
        }
    })
}

export { tailwindAnimations, tailwindColors, tailwindPropertyUtilities, tailwindVariables, tailwindVariablesFont }

export default createPlugin
