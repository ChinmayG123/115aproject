// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/tailor-assets/tailor.png';
import learnBG from '../../assets/tailor-assets/contentbox.png';
import npcTextbox from '../../assets/tailor-assets/textbox.png';
import sewingTable from '../../assets/tailor-assets/sewingTable.png';
import tailorbg from '../../assets/tailor-assets/tailorBG.png';
import './Artist.css';
import './Tailor.css';

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


import React, { useState } from 'react';


const Tailor = function() {

    const navigate = useNavigate(); 

    const goToMenu =() => {navigate('/home')};


    return(  

        <div className = "container">
            
              
            <img id= "artistbg" src={tailorbg}></img>
            <div className = "learn-content">
                <img id= "learnBG" src={learnBG} />
            </div>
            <div className = "npc-content">
                {/* <img id= "npcTextbox" src={npcTextbox} />
                <img id = "npcimg" src={npcimg} /> */}
 
                {/* {showText && <p>This is the NPC's text.</p>} */}
            
                <img id="tailornpcimg" src={npcimg} alt="npc image" />
                <img id= "sewingTable" src={sewingTable}></img>
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

export default Tailor;






