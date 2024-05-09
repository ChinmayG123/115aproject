// import React from 'react';
// import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';

import './Dictionary.css'; // Import your CSS file for styling
import closeimg from '../../assets/dictionary-assets/CloseTab.png'
import menuimg from '../../assets/dictionary-assets/MenuTab.png'
import nextimg from '../../assets/dictionary-assets/PageFWD.png'
import prvsimg from '../../assets/dictionary-assets/PageBKWD.png'
import pagesimg from '../../assets/dictionary-assets/Pagesfull.png'
import baseimg from '../../assets/dictionary-assets/DictionaryBaseFull.png'
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom


import blue from '../../assets/dict-images/colors/blue.png';
import black from '../../assets/dict-images/colors/black.png';
import brown from '../../assets/dict-images/colors/brown.png';
import green from '../../assets/dict-images/colors/green.png';
import orange from '../../assets/dict-images/colors/orange.png';
import red from '../../assets/dict-images/colors/red.png';
import white from '../../assets/dict-images/colors/white.png';
import yellow from '../../assets/dict-images/colors/yellow.png';

import apple from '../../assets/dict-images/food/Apple.png';
import bread from '../../assets/dict-images/food/Bread.png';
import egg from '../../assets/dict-images/food/Eggs.png';
import fish from '../../assets/dict-images/food/Fish.png';
import juice from '../../assets/dict-images/food/Juice.png';
import meat from '../../assets/dict-images/food/Meat.png';
import milk from '../../assets/dict-images/food/Milk.png';
import water from '../../assets/dict-images/food/Water.png';



const getWordImageSrc = (wordImage) => {
  switch (wordImage) {
      case 'black':
          return black;
      case 'blue':
          return blue;
      case 'brown':
          return brown;
      case 'red':
          return red;
      case 'yellow':
          return yellow;
      case 'green':
          return green;
      case 'white':
          return white;
      case 'orange':
          return orange;
      case 'apple':
        return apple;
      case 'bread':
          return bread;
      case 'egg':
          return egg;
      case 'fish':
          return fish;
      case 'juice':
          return juice;
      case 'meat':
          return meat;
      case 'milk':
          return milk;
      case 'water':
          return water;
      default:
          return null;
  }
};

const getTheUserInformation = async (username, language) => {
  try {
      const result = await gameClient.getUserDictionary(username, language);
      // return { status: 'success' };
      return result;
      // return { status: 'success', result: result };
  } catch (error) {
      return { status: 'error', message: 'An error occurred during login. Please try again.' };
  }
}

function DictionaryPopup (props) {

  const { selectedLanguage } = props;


  const navigate = useNavigate(); 
  const goToMenu =() => {navigate('/home')};
  const [userDictionary, setUserDictionary] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);
  const [translations, setTranslations] = useState({});



const handleClose = () => {
  props.setTrigger(false);
  setCurrentPage(0); // Reset the current page to 0
};


const handleNextPage = () => {
  if (currentPage < Math.floor((Object.keys(userDictionary).length - 1) / 2)) {
    setCurrentPage(current => {
      const nextPage = current + 1;
      console.log("Current Page:", nextPage); // Log the updated current page
      return nextPage;
    });
  } else {
    console.log("Cannot go to next page. Limit reached.");
  }
};
 

  const handlePreviousPage = () => {
    setCurrentPage(current => Math.max(current - 1, 0));
  };

  useEffect(() => {
    const fetchData = async () => {
        
        const result = await getTheUserInformation(props.username, selectedLanguage);
        setUserDictionary(result);
        setCurrentPage(0); 



      // Fetch translations
      const translationsObject = {};
      for (const [key, _] of Object.entries(result)) {
        console.log("key", key);
        const translation = await gameClient.getTranslation(props.username, selectedLanguage, key);
        console.log("translate", translation);
        translationsObject[key] = translation;
      }
      setTranslations(translationsObject);

    }
    fetchData();
}, [props.username, selectedLanguage]);


  console.log("AYYYYY", translations);
  return (props.trigger) ? (
    <div className= "popup">      
        <div className= "popup-inner"> 
          <div className= "button-row">
            <button className= "button" id= "dictionary-menu-btn" onClick={goToMenu}>
              <img src={menuimg} />
            </button>
              {/* <button className= "button" id= "dictionary-close-btn" onClick={() => props.setTrigger(false)}>
              <img src={closeimg} /></button> */}

            <button className="button" id="dictionary-close-btn" onClick={handleClose}>
              <img src={closeimg} />
            </button>
          </div>

           {/*LEFT PAGE DIV-------------------*/}
          <div className= "popup-page-left">
            
            <div className = "welcome-user">
              <h2>Welcome, {props.username}!</h2>
              <p>Total Learned Words: {Object.keys(userDictionary).length}</p>
            </div>

            <br></br>
            
          
            <div className = "learned-words1" >
              {userDictionary &&
                    Object.entries(userDictionary).map(([key, value], index) => {
                        if (index % 2 === 0 && index === currentPage * 2) {
                      // if (index >= currentPage * 2 && index < (currentPage + 1) * 2) {
                        return (
                          <div key={key} className="word-container">
    {/*                             
                                <h1 style={{ marginTop: index === currentPage * 2 + 1 ? '-20px' : '0'}}>
                                  {translations[key] ? `${key}: ${translations[key][key]}` : `${key}: ${value}`}
                              </h1> */}
                              

                              <div className="image-container">
                                {getWordImageSrc(key) && (
                                  <img
                                    id="wordImage1"
                                    src={getWordImageSrc(key)}
                                    alt={key}
                                  />
                                )}
                              </div>

                              <div className="word-info">
                                <h1 style={{ marginTop: '270px', marginLeft: '50px' }} >English: {key}</h1>
                                <h1 style={{marginLeft: '50px'}}>{selectedLanguage}: {translations[key] ? translations[key][key] : value}</h1>
              </div>
                            </div>
                        );
                      }
                      return null;
                    })}
              </div>
              
            <button className="button" id="prvs-page-btn" onClick={handlePreviousPage}>
                <img src={prvsimg} />
            </button>
            <br />
          {/*end left page div*/}
          </div>

          {/* testing */}
          {/*RIGHT PAGE DIV-------------------*/}
          <div className= "popup-page-right">

            <div className = "learned-words2">
              {userDictionary &&
                  Object.entries(userDictionary).map(([key, value], index) => {
                    if (index === currentPage * 2 + 1) {
                      return (
                        <div key={key} className="word-container2">
                            <div className="image-container">
                                  {getWordImageSrc(key) && (
                                    <img
                                      id="wordImage2"
                                      src={getWordImageSrc(key)}
                                      alt={key}
                                    />
                                  )}
                                </div>
                            <div className="word-info2">
                              <h1 style={{ marginTop: '270px', marginLeft: '40px' }} >English: {key}</h1>
                              <h1 style={{marginLeft: '40px'}}>{selectedLanguage}: {translations[key] ? translations[key][key] : value}</h1>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  })}
            </div>

            <button className="button" id="next-page-btn" onClick={handleNextPage} 
              disabled={currentPage >= Math.floor((Object.keys(userDictionary).length - 1) / 2)}>
              <img src={nextimg} />
            </button>
          {/*end right page div*/}
          </div>

                  
        {/*end inner div*/}
        </div>
        {/*end popup*/}
    </div>
  ) : "";
}
export default DictionaryPopup;