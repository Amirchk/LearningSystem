import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { DarkModeProvider } from "../src/pages/DarkModeContext";
import './css/index.css'
import './css/App.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DarkModeProvider>
        <App />
    </DarkModeProvider>
  </StrictMode>,
)