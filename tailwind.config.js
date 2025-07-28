import winduum from './plugin/index.js'
import process from 'node:process'

export default {
  darkMode: 'class',
  content: [
    './src/**/*.{js,html}',
    process.argv.includes('vite.config.prod.js') ? './playground/tailwind.html' : './playground/**/*.{js,html,vue}',
  ],
  plugins: [
    winduum({
      settings: {
        rgb: false,
      },
    }),
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
