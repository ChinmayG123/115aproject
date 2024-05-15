// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './MultChoice.css';




// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';


const Quiz = ({ questionType }) => {



    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };




    return(  

        <div className = "container">
            

            <h1>QUIZZZZZ</h1>
            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     );
};

export default Quiz;



