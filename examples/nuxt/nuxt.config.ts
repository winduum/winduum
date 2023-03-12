export default defineNuxtConfig({
    postcss: {
        plugins: {
            'postcss-import': {},
            'tailwindcss/nesting': 'postcss-nesting',
            'postcss-custom-media': {},
            'tailwindcss': {},
            'autoprefixer': {},
            "css-has-pseudo": {}
        }
    }
})
