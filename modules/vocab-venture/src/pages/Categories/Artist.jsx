// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './Artist.css';

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


import React, { useState } from 'react';


const Artist = function() {

    const navigate = useNavigate(); 

    const goToMenu =() => {navigate('/home')};


    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


    const greetings = {
        'spanish': 'Hola',
        'french': 'Bonjour',
    };


    const greeting = greetings[selectedlanguage] || 'Hello'; 



    const texts = [
        `${greeting} ${username}!`,
        "We will learn about colors here!",
        "Let's begin!"
    ];


    const [currentTextIndex, setCurrentTextIndex] = useState(0);



    const showNextText = () => {
        if (currentTextIndex < texts.length - 1) {
            setCurrentTextIndex(currentTextIndex + 1);
        }
    };



    return(  

        // <div className = "next-button">
        //     <button type= "button" id = "nextbutton" onClick= {goToMenu}>Back Home</button>
        // </div>

        <div className = "container">
            
              
            <img id= "artistbg" src={artistbg}></img>
            <div className = "learn-content">
                <img id= "learnBG" src={learnBG} />
            </div>
            <div className = "npc-content">
                {/* <img id= "npcTextbox" src={npcTextbox} />
                <img id = "npcimg" src={npcimg} /> */}
 
                {/* {showText && <p>This is the NPC's text.</p>} */}
                <p>{texts[currentTextIndex]}</p>
                <img id="npcTextbox" src={npcTextbox} alt="npc text box" />
                <img id="npcimg" src={npcimg} alt="npc image" />
                
                

                {/* {showText && <p>This is the NPC's text.</p>} */}
            </div>
            <img id= "easelimg" src={easel}></img>
            <div className= "textdiv">
                <input type="text" className = "learnInputBox" placeholder='text'/>
            </div>

            {/* <button onClick={goToMenu}>Go to Menu</button> */}
            {/* <button type= "button" id = "nextbutton" onClick= {goToMenu}>Next</button> */}
            {/* <button type="button" id="nextbutton" onClick={showNpcText}>Next</button> */}

            {/* <button type="button" id="nextbutton" onClick={showNextText}>Next</button> */}

            
            <button type="button" id="nextbutton" onClick={showNextText}>
                {currentTextIndex === texts.length - 1 ? "Start" : "Next"}
            </button>

                  
        </div>
    
     );
};

export default Artist;



