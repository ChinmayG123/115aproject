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
  




const MultChoiceOG = ({ questionType }) => {


    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;

    const difficulty = location.state.difficulty;
  
    console.log("DIFFICULTY", difficulty);

  
    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    const [chosenWords, setChosenWords] = useState([]);
    const [fetchedWords, setFetchedWords] = useState([]);

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState([]);

    const [correctMessage, setCorrectMessage] = useState(""); // Define the state for displaying the message



    const [translations, setTranslations] = useState({});

    
    // the user's dictionary 
    const [userDictionary, setUserDictionary] = useState([]);



    //if the user should see new words or practice old ones 
    const [userChoice, setUserChoice] = useState("");

    const [textInput, setTextInput] = useState(""); 
    const [wordChoices, setWordChoices] = useState([]);


    const [isLastWordCorrect, setIsLastWordCorrect] = useState(true); // Track if the last entered word was correct



    const getInitialTimer = (difficulty) => {
        switch (difficulty) {
            case 'easy':
                return 15; // Set timer to 15 seconds for easy difficulty
            case 'medium':
                return 10; // Set timer to 10 seconds for medium difficulty
            case 'hard':
                return 5; // Set timer to 5 seconds for hard difficulty
            default:
                return 10; // Default to 10 seconds
        }
    };


    const initialTimer = getInitialTimer(difficulty); // Calculate initial timer value outside the useEffect hook

    const [timer, setTimer] = useState(initialTimer); // Initial timer value in seconds


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
                const shuffledEntries = Object.entries(result).sort(() => Math.random() - 0.5);
                const shuffledDictionary = Object.fromEntries(shuffledEntries);
    
                setUserDictionary(shuffledDictionary);
            } catch (error) {
                console.error('An error occurred while fetching user information:', error);
            }
        };
        fetchData();
    }, [username, selectedlanguage]);

    let englishword = Object.keys(userDictionary)[currentWordIndex];
    let wordChoice = Object.keys(userDictionary).slice(currentWordIndex, currentWordIndex + 4); // assuming you have a translation available
    
    useEffect(() => {
        const fetchTranslations = async () => {
            let generated = await gameClient.getMultipleChoice(username, selectedlanguage, englishword);
            let translated = await gameClient.getTranslation(username, selectedlanguage, englishword);
            console.log("This is the word to filter", translated[englishword]);
            generated[1] = generated[1].filter(item => item !== translated[englishword]);

            let temp = [];
            for (const dictWord of wordChoice) {
                const translation = await gameClient.getTranslation(username, selectedlanguage, dictWord);
                // console.log("TRANSLATION", translation);
                if (translation) {
                    temp.push(translation[dictWord]);
                } else {
                    temp.push(""); // Push an empty string if the translation is missing
                }
            }
            setTranslatedWord(temp);
            let newArray = [];
            newArray.push(translated[englishword]);
            for (const genWord of generated[1])
            {
                    newArray.push(genWord); //populate the newarray with the filtered generated words
            }
            //let choices = temp.slice(0, 4); // Get the first 4 translations
            let choices = newArray.slice(0, 4);
             //filter out the correct word from the incorrect answer choices
            console.log("getting GPT words", generated[1]);
           
            console.log("before", choices);
            const shuffledchoices = Object.entries(choices).sort(() => Math.random() - 0.5 + Math.random() - 0.5).map(([key, value]) => value);
            console.log("shuffled", shuffledchoices);
            setWordChoices(shuffledchoices);

        };
    
        fetchTranslations();
    }, [currentWordIndex, selectedlanguage, userDictionary, username]);
    


    const showNextWord = () => {
        if (currentWordIndex < Object.keys(userDictionary).length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
            englishword = Object.keys(userDictionary)[currentWordIndex + 1];
            // console.log("englishword", englishword);
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
        // console.log("shuffled words: ", shuffledArray);
    }

    const handleEnterClick = async (clickedWord) => {
        const initialTimer = getInitialTimer(difficulty);
        const translation = await gameClient.getTranslation(username, selectedlanguage, englishword);
        console.log("ENGLISH", englishword);
        console.log("This is the desired output:", translation[englishword]);
        console.log("CLICKED", clickedWord);
        if (clickedWord === translation[englishword]) {
            // console.log("correct");
            setCorrectMessage("Correct!");
            setTimeout(() => {
                showNextWord();
                setCorrectMessage("");
            }, 1500);
            setIsLastWordCorrect(true);
            // setTimer(10); // Reset the timer to 10 seconds
            // await gameClient.upProficiency(username, selectedlanguage, englishword);



            // Wait 2 seconds before moving to the next word
            setTimeout(() => {
                showNextWord();
                gameClient.downProficiency(username, selectedlanguage, englishword); // Call downProficiency()
                setTimer(initialTimer); // Reset timer to initial value
            }, 2000);
        } else {
            console.log("wrong");
            setIsLastWordCorrect(false);
            setCorrectMessage("Try again!");
            setTimeout(() => {
                setCorrectMessage("");
            }, 1500);
            await gameClient.downProficiency(username, selectedlanguage, englishword);
            setTimer(initialTimer);
        }
        setTextInput("");

        // navigate('/outskirts', { state: { username, language: selectedlanguage, questionType: "type" } });

    };




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


    


    return(  

        <div className = "container">
            

            <div className='timer'>
                
                {/* <h1>Timer: {timer}</h1> */}

                <h1>Timer: {timer === 0 ? "Time is up!" : timer}</h1>


            </div>



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
                                <h1 style={{ marginTop: '300px', marginLeft: '550px' }} >English: {key}</h1>
                                </div>
                        </div>
                        );
                      return null;
                    })}


            

                <div className="word-buttons">
                    {wordChoices.map((spanishWord, index) => (
                        <button key={`${spanishWord}-${index}`} className="word-button" onClick={() => handleEnterClick(spanishWord)}>
                            {spanishWord}
                        </button>
                    ))}
                </div>

                      

              </div>

                    
              {correctMessage && (
                            <div className="message-display">
                                <p>{correctMessage}</p>
                            </div>
                        )}


            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     );
};

export default MultChoiceOG;


