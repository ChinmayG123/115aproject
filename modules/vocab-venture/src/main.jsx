//main javascript file 
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
//import 'bootstrap/dist/css/bootstrap.css'
//import './index.css'
import './scss/main.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
    <App /> {/*app component that we imported*/}
  </React.StrictMode>,
)
