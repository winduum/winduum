import winduum from './plugin/index.js'
import containerQueries from '@tailwindcss/container-queries'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{js,html}',
        process.argv.includes('vite.config.prod.js') ? './playground/tailwind.html' : './playground/**/*.{js,html,vue}'
    ],
    plugins: [
        winduum({
            settings: {
                rgb: false
            }
        }),
        containerQueries
    ],
    future: {
        hoverOnlyWhenSupported: true
    }
}
