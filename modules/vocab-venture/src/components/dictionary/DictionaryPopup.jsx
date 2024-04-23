import React from 'react';
import './Dictionary.css'; // Import your CSS file for styling
import closeimg from '../../assets/dictionary-assets/CloseTab.png'
import menuimg from '../../assets/dictionary-assets/MenuTab.png'
import pagesimg from '../../assets/dictionary-assets/Pagesfull.png'
import baseimg from '../../assets/dictionary-assets/DictionaryBaseFull.png'


function DictionaryPopup (props) {
  return (props.trigger) ? (
    <div className= "popup">      
        <div className= "popup-inner">
          <div className= "button-row">
            <button className= "button" id= "dictionary-menu-btn">
              <img src={menuimg} /></button>
            <button className= "button" id= "dictionary-close-btn" onClick={() => props.setTrigger(false)}>
              <img src={closeimg} /></button>
          </div>
          {props.children}

          <div className= "popup-pages">
            
          </div>
          

        </div>
    </div>
  ) : "";
}
export default DictionaryPopup;