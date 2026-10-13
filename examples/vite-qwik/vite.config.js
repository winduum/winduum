import { defineConfig } from 'vite'
import { qwikVite } from '@builder.io/qwik/optimizer'
import tailwindcss from '@tailwindcss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    qwikVite({
      csr: true,
    }),
    tailwindcss(),
  ],
})
