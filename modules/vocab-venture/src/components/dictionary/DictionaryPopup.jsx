import React from 'react';
import './Dictionary.css'; // Import your CSS file for styling
import closeimg from '../../assets/dictionary-assets/CloseTab.png'
import menuimg from '../../assets/dictionary-assets/MenuTab.png'
import nextimg from '../../assets/dictionary-assets/PageFWD.png'
import prvsimg from '../../assets/dictionary-assets/PageBKWD.png'
import pagesimg from '../../assets/dictionary-assets/Pagesfull.png'
import baseimg from '../../assets/dictionary-assets/DictionaryBaseFull.png'
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


function DictionaryPopup (props) {

  const navigate = useNavigate(); 
  const goToMenu =() => {navigate('/home')};
  
  return (props.trigger) ? (
    <div className= "popup">      

        
        <div className= "popup-inner">
          
          <div className= "button-row">
            
            <button className= "button" id= "dictionary-menu-btn" onClick={goToMenu}>
              <img src={menuimg} /></button>
            <button className= "button" id= "dictionary-close-btn" onClick={() => props.setTrigger(false)}>
              <img src={closeimg} /></button>
            
          </div>

          
          {props.children}

          <div className= "popup-pages">

          <button className= "button" id= "next-page-btn" onClick={goToMenu}>
            <img src={nextimg} /></button>
          
          <button className= "button" id= "prvs-page-btn" onClick={goToMenu}>
            <img src={prvsimg} /></button>

          </div>
          

        </div>
    </div>
  ) : "";
}
export default DictionaryPopup;