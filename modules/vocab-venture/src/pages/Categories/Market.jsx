// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/market-assets/ShopOwner.png';
import learnBG from '../../assets/market-assets/Contentbox.png';
import npcTextbox from '../../assets/market-assets/MarketTextbox.png';
import stall from '../../assets/market-assets/Stall.png';
import marketbg from '../../assets/market-assets/MarketBG.png';
import './Artist.css';
import './Market.css';

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';


import React, { useState } from 'react';


const Market = function() {

    const navigate = useNavigate(); 

    const goToMenu =() => {navigate('/home')};


    return(  

        <div className = "container">
            
              
            <img id= "artistbg" src={marketbg}></img>
            <div className = "learn-content">
                <img id= "learnBG" src={learnBG} />
            </div>
            <div className = "npc-content">
                {/* <img id= "npcTextbox" src={npcTextbox} />
                <img id = "npcimg" src={npcimg} /> */}
 
                {/* {showText && <p>This is the NPC's text.</p>} */}
            
                <img id="marketnpcimg" src={npcimg} alt="npc image" />
                <img id= "easelimg" src={stall}></img>
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

export default Market;



