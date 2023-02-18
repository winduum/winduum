import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// to adding support for :has selector for unsupported browsers
!CSS.supports('selector(:has(*))') && (async() => (await import('css-has-pseudo/browser')).default(document))()

createApp(App).mount('#app')
