import winduum from 'winduum/plugin'

export default {
    darkMode: 'class',
    content: [
        './node_modules/winduum/src/**/*.js',
        './index.html'
    ],
    plugins: [
        winduum()
    ]
}
