import tailwindcss from '@tailwindcss/vite'
import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
    compatibilityDate: '2026-10-13',
    css: ['~/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
})
