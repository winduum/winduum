import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'

export default {
    plugins: [
        tailwindcss(),
        vue()
    ],
    resolve: {
        alias: {
            '/src': resolve(process.cwd(), 'src')
        }
    },
    root: resolve(process.cwd(), 'playground'),
    publicDir: resolve(process.cwd(), 'public'),
    envDir: process.cwd(),
    build: {
        outDir: resolve(process.cwd(), 'dist')
    }
}
