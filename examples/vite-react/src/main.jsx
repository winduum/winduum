import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'

// to adding support for :has selector for unsupported browsers
!CSS.supports('selector(:has(*))') && (async() => (await import('css-has-pseudo/browser')).default(document))()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
