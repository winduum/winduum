import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'
import postcssImport from "postcss-import"
import postcssNesting from "postcss-nesting"
import postcssCustomMedia from "postcss-custom-media"
import tailwindcssNesting from 'tailwindcss/nesting'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import postcssHasPseudo from "css-has-pseudo"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [svelte()],
  css: {
    postcss: {
      plugins: [
        postcssImport,
        tailwindcssNesting(postcssNesting),
        postcssCustomMedia,
        tailwindcss,
        autoprefixer,
        postcssHasPseudo
      ]
    }
  },
})
