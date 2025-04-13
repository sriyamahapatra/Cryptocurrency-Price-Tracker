// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CoinContextProvide from './Context/CoinContext.jsx'

createRoot(document.getElementById('root')).render(
  <CoinContextProvide>
    <App/>
  </CoinContextProvide>
  
)
