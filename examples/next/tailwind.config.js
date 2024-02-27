import winduum from 'winduum/plugin'

export default {
    darkMode: 'class',
    content: [
        './node_modules/winduum/src/**/*.js',
        './app/**/*.{js,ts,jsx,tsx}',
        './page/**/*.{js,ts,jsx,tsx}',
        './ui/**/*.{js,ts,jsx,tsx}'
    ],
    plugins: [
        winduum()
    ]
}
