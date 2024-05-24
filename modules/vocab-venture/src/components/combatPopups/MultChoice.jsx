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
  




const MultChoice = (props) => {


    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;

  

  
    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState([]);

    const [correctMessage, setCorrectMessage] = useState(""); // Define the state for displaying the message
    const [multChoiceOptions, setMultChoiceOptions] = useState([]);
    
    // the user's dictionary 
    const [userDictionary, setUserDictionary] = useState([]);



    //if the user should see new words or practice old ones 
    const [userChoice, setUserChoice] = useState("");

    const [textInput, setTextInput] = useState(""); 
    const [wordChoices, setWordChoices] = useState([]);

 

    
    //let englishword = props.wordToShow;
    //console.log("word from quiz ",englishword)
    //let wordChoice = Object.keys(userDictionary).slice(currentWordIndex, currentWordIndex + 3); // assuming you have a translation available
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
    useEffect(() => {
      const fetchData = async () => {
        const result = await getTheUserInformation(props.username, selectedlanguage);
        setUserDictionary(Object.keys(result));
      }
      fetchData();
    }, [props.username, selectedlanguage]);


    console.log("MC");
    useEffect(() => {

        const fetchTranslations = async () => {
          let temp = [];
           /*
           //choosing 3 random false words 
            for(let i = 0; i < 3; i++){
                let word = userDictionary[Math.floor(Math.random() * userDictionary.length)];
                const translation = await gameClient.getTranslation(username, selectedlanguage, word);
                if (translation) {
                    temp.push(translation[word]);
                } else {
                    temp.push(""); // Push an empty string if the translation is missing
                }
            }
            
            console.log(temp);*/
            
            for (const dictWord of props.wordGroup) {
                const translation = await gameClient.getTranslation(username, selectedlanguage, dictWord);
                // console.log("TRANSLATION", translation);
                if (translation) {
                    temp.push(translation);
                } else {
                    temp.push(""); // Push an empty string if the translation is missing
                }
            }
    
            const shuffledchoices = Object.entries(temp).sort(() => Math.random() - 0.5 + Math.random() - 0.5).map(([key, value]) => value);
            setWordChoices(shuffledchoices);
        };
    
        fetchTranslations();
    },[props.wordGroup]);

    
    const handleEnterClick = async (clickedWord) => {
        //console.log(wordChoices);
        let correctWord = props.wordToShow;
        const translation = await gameClient.getTranslation(username, selectedlanguage,correctWord);
        console.log("ENGLISH", correctWord);
        console.log("correct answer:", translation);
        console.log("CLICKED", clickedWord);
        if (clickedWord === translation) {
            


            setCorrectMessage("Correct!");
            setTimeout(() => {
                // showNextWord();
                setCorrectMessage("");
                props.setIsAttacking(true);
                gameClient.upProficiency(username, selectedlanguage, correctWord); // Call downProficiency()
                props.setIsAnswerCorrect(true);
                props.setIsQuestionDone(true);   
            }, 2000);
        } else {
            props.setIsHit(true);
            props.setIsAnswerCorrect(false);
            setCorrectMessage("Incorrect word!");

            setTimeout(() => {

                gameClient.downProficiency(username, selectedlanguage, correctWord); // Call downProficiency()
                props.setIsQuestionDone(true);
                setCorrectMessage("");

            }, 3000);


        }
        setTextInput("");

        // navigate('/outskirts', { state: { username, language: selectedlanguage, questionType: "type" } });

    };


/*
    useEffect(() => {
        const initialTimer = getInitialTimer(difficulty);
        console.log("NEW TIMERRR", initialTimer);
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0 && !correctMessage) {
                    return prevTimer - 1;
                } 
                else if (prevTimer > 0 && correctMessage) {
                    return prevTimer;
                } else {
                    // Timer expired
                    clearInterval(interval); // Stop the interval
                    setTimeout(() => {
                        showNextWord(); // Move to the next word after 2 seconds
                        gameClient.downProficiency(username, selectedlanguage, englishword); // Call downProficiency()
                        setTimer(initialTimer); // Reset timer to initial value
                    }, 2000);
                    return 0; // Set timer to 0 to display "Time is up!"
                }
            });
        }, 1000); // Update timer every second
    
        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [currentWordIndex, showNextWord, username, selectedlanguage, englishword, correctMessage, difficulty, initialTimer]); // Re-run effect when necessary dependencies change

*/
    


    return(props.trigger) ?  (

        <div className = "mc-container">
            <div className = "mcCONTENT" >            
                          <div className="mc-word-container">
                            <div className="mc-image-container">
                                {getWordImageSrc(props.wordToShow) && (
                                  <img
                                    id="mc-image"
                                    src={getWordImageSrc(props.wordToShow)}
                                    alt={props.wordToShow}
                                  />
                                )}
                              </div>
                              <div className="mc-word-info">
                                <h1 >English: {props.wordToShow}</h1>
                                </div>
                                               
                                <div className="mc-buttons">
                                    {wordChoices.map((spanishWord, index) => (
                                        <button key= {index} className="mc-button" onClick={() => handleEnterClick(spanishWord)}>
                                            {spanishWord}
                                        </button>
                                    ))}
                                </div>
                        </div>  
                        
              </div>

                    
              {correctMessage && (
                            <div className="message-display-mc">
                                <p>{correctMessage}</p>
                            </div>
                        )}


            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     ):"";
};

export default MultChoice;



