import winduum from './plugin/index.js'
import containerQueries from '@tailwindcss/container-queries'
import animate from 'tailwindcss-animate'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,html}',
        './playground/**/*.{js,html,vue}'
    ],
    plugins: [
        winduum({
            settings: {
                rgb: false
            }
        }),
        containerQueries,
        animate
    ],
    future: {
        hoverOnlyWhenSupported: true
    }
}
