import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import postcssImport from "postcss-import"
import postcssNesting from "postcss-nesting"
import postcssCustomMedia from "postcss-custom-media"
import tailwindcssNesting from 'tailwindcss/nesting'
import tailwindcss from "tailwindcss"
import autoprefixer from "autoprefixer"
import postcssHasPseudo from "css-has-pseudo"

export default defineConfig(() => {
  return {
    plugins: [ qwikVite({
      client: {
        input: './src/root.jsx',
        devInput: './src/entry.dev.jsx'
      },
      ssr: {
        input: './src/entry.ssr.jsx'
      }
    })],
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
  };
});
