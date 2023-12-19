import winduum from './utils/tailwind.js'
import containerQueries from '@tailwindcss/container-queries'
import animate from 'tailwindcss-animate'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,html}',
        './playground/**/*.{js,html,vue}'
    ],
    plugins: [
        winduum(),
        containerQueries,
        animate
    ]
}
