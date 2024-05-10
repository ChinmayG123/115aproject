// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './Type.css';

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


// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';



const Type = function() {

//   const { selectedLanguage } = props;



    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;
  
    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    const [chosenWords, setChosenWords] = useState([]);
    const [fetchedWords, setFetchedWords] = useState([]);
    const [seenWords, setSeenWords] = useState([]);
    const [unseenWords, setUnseenWords] = useState([]);
    const [texts, setTexts] = useState([]);
    const [promptTrigger, setPromptTrigger] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState('');



  const [translations, setTranslations] = useState({});

    
    // the user's dictionary 
    const [userDictionary, setUserDictionary] = useState([]);



    //if the user should see new words or practice old ones 
    const [userChoice, setUserChoice] = useState("");

    const [textInput, setTextInput] = useState(""); 


    const [isLastWordCorrect, setIsLastWordCorrect] = useState(true); // Track if the last entered word was correct



    const getTheUserInformation = async (username, language) => {
        try {
            const result = await gameClient.getUserDictionary(username, language);
            return result;
        } catch (error) {
            return { status: 'error', message: 'An error occurred during login. Please try again.' };
        }
      }

      useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(username, selectedlanguage);
                const result = await getTheUserInformation(username, selectedlanguage);
                if (!result) {
                    console.error('User dictionary is empty or undefined.');
                    return;
                }

                console.log("result", result);


                // Shuffle the entries (key-value pairs) in the dictionary
                const shuffledEntries = Object.entries(result).sort(() => Math.random() - 0.5);
                const shuffledDictionary = Object.fromEntries(shuffledEntries);

                console.log("shuffledDictionary", shuffledDictionary);

    
                setUserDictionary(shuffledDictionary);
            } catch (error) {
                console.error('An error occurred while fetching user information:', error);
            }
        };
        fetchData();
    }, [username, selectedlanguage]);


    // const [englishword, setEnglishWord] = useState('');

    let englishword = Object.keys(userDictionary)[currentWordIndex];
    const showNextWord = () => {
        if (currentWordIndex < Object.keys(userDictionary).length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            englishword = Object.keys(userDictionary)[currentWordIndex + 1];
            console.log("englishword", englishword);
            // setEnglishWord(Object.keys(userDictionary)[currentWordIndex + 1]);
        }
    };
    
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setTextInput(newValue); // Update the text input value as the user types
        // console.log(newValue);
    };


   const randomizeWords = (array) =>{
        // Create a copy of the array
        const shuffledArray = array.slice();
        // Shuffle the copy
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        // Update state with the shuffled array
        setChosenWords(shuffledArray);
        console.log("shuffled words: ", shuffledArray);
    }



    const handleEnterClick = async (key) => {
        

        console.log(textInput);
        console.log("key", key);

        const translation = await gameClient.getTranslation(username, selectedlanguage, key);
        console.log("translationnnn", translation);
        console.log("keyyy", translation[key]);

        if (translation) {
            setTranslatedWord(translation[key]);
        }

        if (textInput.toLowerCase() === translation[key].toLowerCase()) {
            showNextWord();
            setIsLastWordCorrect(true); // Set the state to true if the word is correct
            console.log("page", currentWordIndex);
        } else {
            console.log("Incorrect word. Try again!");
            setIsLastWordCorrect(false); // Set the state to false if the word is incorrect
        }
    
        setTextInput(""); // Clear the text input after checking
    };

    console.log("page", currentWordIndex);
    

    return(  

        <div className = "container">
            

            <div className="textdiv">
                <input
                    type="text"
                    className="learnInputBox"
                    placeholder="text"
                    value={textInput}
                    onChange={handleInputChange}
                />
            </div>

{/* 
            <button type="button"  id="enterbutton" onClick={() => handleEnterClick(englishword)}>
                Enter
            </button> */}


            <div className = "learned-words1" >
              {userDictionary &&
                    Object.entries(userDictionary).map(([key, value], index) => {
                        // englishword = key;
                        if (index === currentWordIndex)
                        return (
                          
                          <div key={key} className="word-container">
                            
                            
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
                                <h1 style={{ marginTop: '250px', marginLeft: '200px' }} >English: {key}</h1>
                                </div>

                            {/* <button type="button" style={{ position: 'fixed'}} id="enterbutton" onClick={() => handleEnterClick(key)}>
                                Enter
                            </button> */}
                            
                        </div>
                        );
                      
                      return null;
                    })}
              </div>
            
            <button type="button"  id="enterbutton" onClick={() => handleEnterClick(englishword)}>
                Enter
            </button>


            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     );
};

export default Type;



