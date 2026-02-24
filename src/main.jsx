import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './design-system/tokens.css'
import './design-system/base.css'
import './design-system/components.css'
import './design-system/layout.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
