import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AlertProvider } from './AlertContext.jsx'
import AlertBox from './components/AlertBox.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AlertProvider>
      <App />
      <AlertBox/>
    </AlertProvider>
    
  </React.StrictMode>,
)
