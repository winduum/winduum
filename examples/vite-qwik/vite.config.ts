import { defineConfig } from 'vite';
import { qwikVite } from '@builder.io/qwik/optimizer';
import { qwikCity } from '@builder.io/qwik-city/vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import postcssImport from "postcss-import";
import postcssNesting from "postcss-nesting";
import postcssCustomMedia from "postcss-custom-media";
import tailwindcssNesting from 'tailwindcss/nesting'
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import postcssHasPseudo from "css-has-pseudo";

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
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
