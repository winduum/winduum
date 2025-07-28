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
  tailwindVariablesFont,
} from './utilities/common.js'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const relativePath = file => resolve(dirname(fileURLToPath(import.meta.url)), file)

/**
 * @type {import('./').PluginOptions} options.
 */
export const defaultConfig = {
  animations: ['ripple', 'spin', 'move-indeterminate', 'fade-in', 'fade-out'],
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
    '2xxl': '158rem',
  },
  settings: {
    rgb: false,
    colorMix: true,
  },
}

/**
 * @param {import('./').PluginOptions} userConfig
 */
export const createPlugin = (userConfig = {}) => {
  const settings = {
    ...defaultConfig.settings,
    ...userConfig.settings,
  }

  userConfig = {
    ...defaultConfig,
    ...userConfig,
    settings,
  }

  return plugin(({ addComponents, matchUtilities, theme, e, corePlugins }) => {
    matchUtilities(
      {
        accent: value => accentColor({ value }, userConfig.settings),
      },
      { values: flattenColorPalette(theme('accentColor')), type: ['color', 'any'] },
    )
    matchUtilities(
      {
        text: value => textColor({ value, corePlugins }, userConfig.settings),
      },
      { values: flattenColorPalette(theme('textColor')), type: ['color', 'any'] },
    )
    addComponents(tailwindAnimations(userConfig.animations))
    addComponents(tailwindPropertyUtilities('mask', Object.keys(tailwindParseVariables('mask', relativePath('../src/theme/config/mask.css'), {
      ...tailwindVariables('mask', userConfig.mask ?? []),
    }, userConfig.mask, false))))
    addComponents(divideGap({ theme, e }))
  }, {
    corePlugins: {
      preflight: false,
      textColor: false,
      accentColor: false,
    },
    theme: {
      extend: {
        transitionProperty: {
          DEFAULT: 'var(--default-transition-property)',
        },
        transitionDuration: {
          DEFAULT: 'var(--default-transition-duration)',
        },
        transitionTimingFunction: tailwindParseVariables('ease', relativePath('../src/theme/config/transition.css'), {
          ...tailwindVariables('ease', userConfig.ease ?? []),
        }, userConfig.ease),
        colors: tailwindColors(Object.keys(tailwindParseVariables('color', relativePath('../src/theme/default.css'), {
          ...tailwindVariables('color', userConfig.colors ?? []),
        }, userConfig.colors)), settings.colorMix, settings.rgb),
        fontSize: tailwindParseVariables('text', relativePath('../src/theme/config/font.css'), {
          ...tailwindVariables('text', userConfig.fontSize ?? []),
        }, userConfig.fontSize),
        fontFamily: tailwindParseVariables('font', relativePath('../src/theme/config/font.css'), {
          ...tailwindVariables('font', userConfig.fontFamily ?? []),
        }, userConfig.fontFamily),
        fontWeight: tailwindParseVariables('font-weight', relativePath('../src/theme/config/font.css'), {
          ...tailwindVariables('font-weight', userConfig.fontWeight ?? []),
        }, userConfig.fontWeight),
        zIndex: tailwindParseVariables('z-index', relativePath('../src/theme/config/z.css'), {
          ...tailwindVariables('z-index', userConfig.zIndex ?? []),
          0: 0,
          auto: 'auto',
        }, userConfig.zIndex),
        spacing: tailwindParseVariables('spacing', relativePath('../src/theme/config/spacing.css'), {
          ...tailwindVariables('spacing', userConfig.spacing ?? []),
        }, userConfig.spacing),
        borderRadius: tailwindParseVariables('radius', relativePath('../src/theme/config/radius.css'), {
          ...tailwindVariables('radius', userConfig.borderRadius ?? []),
          DEFAULT: 'var(--radius-xl)',
        }, userConfig.borderRadius),
        screens: userConfig.screens,
      },
    },
  })
}

export { tailwindAnimations, tailwindColors, tailwindPropertyUtilities, tailwindVariables, tailwindVariablesFont }

export default createPlugin
