import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import { qwikCity } from '@builder.io/qwik-city/vite'

export default defineConfig(() => {
  return {
    plugins: [
      qwikCity(),
      qwikVite({
        client: {
          input: './src/root.jsx',
          devInput: './src/entry.dev.jsx'
        },
        ssr: {
          input: './src/entry.ssr.jsx',
        }
      })
    ],
  };
});
