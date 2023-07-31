import winduum from './utils/tailwind.js'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,html}',
        './playground/**/*.{js,html,vue}'
    ],
    plugins: [
        winduum()
    ]
}
