import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import FastGlob from 'fast-glob'
import process from 'node:process'

export default {
  plugins: [
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '/src': resolve(process.cwd(), 'src'),
    },
  },
  root: resolve(process.cwd(), 'playground'),
  publicDir: resolve(process.cwd(), 'public'),
  envDir: process.cwd(),
  build: {
    emptyOutDir: false,
    outDir: resolve(process.cwd(), 'dist'),
    rollupOptions: {
      input: FastGlob.sync(['./src/main.css', './src/tailwind.css']).map(entry => resolve(process.cwd(), entry)),
      output: {
        assetFileNames: '[name].[ext]',
        chunkFileNames: '[name].js',
      },
    },
  },

}
