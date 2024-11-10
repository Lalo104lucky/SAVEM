import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'flowbite';
import 'primereact/resources/themes/saga-blue/theme.css';  // Tema
import 'primereact/resources/primereact.min.css';          // Estilos de componentes
import 'primeicons/primeicons.css';                   // Iconos

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
