const { tailwindColors, tailwindVariables, tailwindColorsAccent, tailwindColorsCurrent, tailwindAnimations } = require('./utils/helpers.cjs')
const plugin = require('tailwindcss/plugin')

const colors = [
  'background', 'default', 'light', 'dark', 'primary', 'secondary',
  'warning', 'error', 'info', 'success', 'accent', `current`
]

const animations = [
  'fade-in', 'fade-out'
]

module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,html}'
  ],
  corePlugins: {
    preflight: false,
    container: false,
    accentColor: false
  },
  theme: {
    extend: {
      colors: tailwindColors(colors),
      fontFamily: tailwindVariables('font', ['primary', 'secondary']),
      fontWeight: tailwindVariables('font', ['light', 'normal', 'medium', 'semibold', 'bold', 'extrabold']),
      zIndex: tailwindVariables('z', [10, 20, 30, 40, 50, 60], {
        0: 0,
        auto: 'auto'
      }),
      spacing: tailwindVariables('spacing', ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'section']),
      borderRadius: tailwindVariables('rounded', ['xs', 'sm', 'base', 'md', 'lg', 'xl', '2xl', '3xl', 'full'], {
        DEFAULT: 'var(--rounded)'
      }),
      screens: {
        'xs': '22.5em',
        'sm': '26em',
        'md': '48em',
        'lg': '60em',
        'xl': '76em',
        '2xl': '82em',
        '3xl': '88em',
        '4xl': '100em',
        'xxl': '126em',
        '2xxl': '158em'
      }
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities(tailwindColorsAccent(colors))
    }),
    plugin(({ addUtilities }) => {
      addUtilities(tailwindColorsCurrent(colors))
    }),
    plugin(({ addUtilities }) => {
      addUtilities(tailwindAnimations(animations))
    })
  ],
}
