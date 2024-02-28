module.exports = {
  plugins: [
    require('postcss-import'),
    require('tailwindcss/nesting')(require('postcss-nesting')),
    require('postcss-custom-media'),
    require('tailwindcss'),
    require('autoprefixer')
  ]
}

