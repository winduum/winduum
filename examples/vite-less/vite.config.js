import tailwindcss from 'tailwindcss'
import tailwindcssNesting from 'tailwindcss/nesting'
import autoprefixer from 'autoprefixer'
import postcssImport from 'postcss-import'
import postcssNesting from 'postcss-nesting'
import postcssCustomMedia from 'postcss-custom-media'
import postcssHasPseudo from 'css-has-pseudo'

export default {
    css: {
        postcss: {
            plugins: [postcssImport, tailwindcssNesting(postcssNesting), postcssCustomMedia, tailwindcss, autoprefixer, postcssHasPseudo]
        }
    }
}
