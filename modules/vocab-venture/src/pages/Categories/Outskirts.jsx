

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';



const Outskirts = function() {


    const navigate = useNavigate(); 


    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;



    const goToType = () => {
        // navigate('/map', { state: { username } });
        console.log("usernameeeee", username);
        console.log("languageeeee", selectedlanguage);
        navigate('/type', { state: { username, language: selectedlanguage } });
    };


    const multipleChoice = () => {
        // navigate('/map', { state: { username } });
        console.log("user", username);
        console.log("language", selectedlanguage);
        navigate('/multiplechoice', { state: { username, language: selectedlanguage } });
    };


    return(  
        <body className = "mapbackground">
            <h1>Outskirts</h1>


            <button type="button" id="goToTypeButton" onClick={goToType}>
                Go to Type
            </button>

            <button type="button" id="MultipleChoiceButton" onClick={multipleChoice}>
                MultipleChoice
            </button>


                

        </body>
 
     );
};

export default Outskirts;



