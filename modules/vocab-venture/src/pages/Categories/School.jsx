// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/school-assets/teacher.png';
import learnBG from '../../assets/school-assets/contentbox.png';
import npcTextbox from '../../assets/school-assets/textbox.png';
import desk from '../../assets/school-assets/desk.png';
import schoolbg from '../../assets/school-assets/schoolBG.png';
import './Artist.css';
import './School.css';

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


import React, { useState } from 'react';


const School = function() {

    const navigate = useNavigate(); 

    const goToMenu =() => {navigate('/home')};


    return(  

        <div className = "container">
            
              
            <img id= "artistbg" src={schoolbg}></img>
            <div className = "learn-content">
                <img id= "learnBG" src={learnBG} />
            </div>
            <div className = "npc-content">
                {/* <img id= "npcTextbox" src={npcTextbox} />
                <img id = "npcimg" src={npcimg} /> */}
 
                {/* {showText && <p>This is the NPC's text.</p>} */}
            
                <img id="schoolnpcimg" src={npcimg} alt="npc image" />
                <img id= "deskimg" src={desk}></img>
                <img id="npcTextbox" src={npcTextbox} alt="npc text box" />
                

                {/* {showText && <p>This is the NPC's text.</p>} */}
            </div>
            
            <div className= "textdiv">
                <input type="text" className = "learnInputBox" placeholder='text'/>
            </div>

            {/* <button onClick={goToMenu}>Go to Menu</button> */}
            {/* <button type= "button" id = "nextbutton" onClick= {goToMenu}>Next</button> */}
            {/* <button type="button" id="nextbutton" onClick={showNpcText}>Next</button> */}


                  
        </div>
    
     );
};

export default School;



