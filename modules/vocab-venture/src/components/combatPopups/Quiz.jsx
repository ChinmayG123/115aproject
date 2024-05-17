// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './MultChoice.css';
import cat from '../../assets/outskirts-assets/testSS.png';
import catHIT from '../../assets/outskirts-assets/catHitSS.png'
import DictionaryPopup from '../../components/dictionary/DictionaryPopup';
import './Quiz.css';
import TypePopup from '../combatPopups/Type';



// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';


const Quiz = () => {
    const [timer, setTimer] = useState(10000000); // Initial timer value in seconds
    const [running, setRunning] = useState(false);
    const [buttonPopup, setButtonPopup] = useState(false);
    const [isHit, setIsHit] = useState(false);


    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    const handleClose = () => {
        props.setTrigger(false);
        setCurrentPage(0); // Reset the current page to 0
    };

    const handleStartClick = () =>{
        setButtonPopup(true);
        setTimer(10);
    }

    const playHitAnim = () =>{
       
        return(
            <img onAnimationEnd= {handleHitEndAnimation} className = "catHitSS" src={catHIT}></img>
    
     )
        
    }

    const handleHitEndAnimation = () =>{
        setIsHit(false);
     
    }
    const playIdleAnim = () => {
        return( <img className= "catSS" src= {cat} ></img>)
    }
        
    return(  
        <div className = "combatBackground">
            
            <div className = "Sprite"> {isHit ? playHitAnim():
            playIdleAnim()
            }
                
            </div>
            <button type="button" onClick= {() => handleStartClick()}> 
                       START            
            </button>
            <TypePopup trigger = {buttonPopup} setTrigger={setButtonPopup} username={username} selectedLanguage={selectedlanguage} timer = {timer} setTimer = {setTimer} running = {running} setRunning = {setRunning}
            setIsHit = {setIsHit}>
            </TypePopup>


        </div>
 
     
    
     );
};

export default Quiz;



