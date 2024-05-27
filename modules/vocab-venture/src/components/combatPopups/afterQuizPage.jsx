
// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';


const afterQuizPage = () => {

    const navigate = useNavigate(); 
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.selectedlanguage
    const [correctCounter, setCorrectCounter] = useState(location.state.beforeCorrectCounter);
    const [wrongCounter, setWrongCounter] = useState(location.state.beforeWrongCounter);



    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };


    
    return(  
        <div className = "hi">
            <h1>Number of Questions Correct: {correctCounter}</h1>
            <h1>Number of Questions Wrong: {wrongCounter}</h1>
            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>

        </div>
 
     
    
     );
};

export default afterQuizPage;


