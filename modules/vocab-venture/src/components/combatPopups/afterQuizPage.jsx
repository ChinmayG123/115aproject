

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';


const afterQuizPage = () => {
    const navigate = useNavigate(); 
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


    
    return(  
        <div className = "hi">

            <h1>TIME IS UP</h1>
        </div>
 
     
    
     );
};

export default afterQuizPage;


