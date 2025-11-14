import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './style.css'

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Error al renderizar la aplicación:', error)
  document.getElementById('root').innerHTML = `
    <div style="padding: 20px; font-family: Arial; color: red;">
      <h1>Error al cargar la aplicación</h1>
      <p>${error.message}</p>
      <p>Por favor, abre la consola del navegador (F12) para ver más detalles.</p>
    </div>
  `
}
