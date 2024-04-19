//main javascript file 
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import MainPage from "./pages/MainPage/MainPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import MapPage from "./pages/MapPage/MapPage";

export default function App() {
  
  return(
    <BrowserRouter>
      <Routes>
      <Route exact path= "/" element={<MainPage></MainPage>}/>
        <Route exact path= "/home" element={<MainPage></MainPage>}/>
        <Route index element= {<MainPage></MainPage>}/>
        <Route exact path= "/login" element={<LoginPage></LoginPage>}/>
        <Route exact path= "/register" element={<RegisterPage></RegisterPage>}/>
        <Route exact path= "/map" element={<MapPage></MapPage>}/>


        </Routes>
    </BrowserRouter>
    
  );  
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
