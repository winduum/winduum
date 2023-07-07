module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,html}',
    './playground/**/*.{js,html,vue}'
  ],
  plugins: [
    require('./utils/tailwind.cjs')()
  ]
}
