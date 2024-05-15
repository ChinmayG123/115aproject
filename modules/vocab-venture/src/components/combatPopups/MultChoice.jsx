// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
// import './MultChoice.css';



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

    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState([]);

    const [correctMessage, setCorrectMessage] = useState(""); // Define the state for displaying the message



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

    let englishword = Object.keys(userDictionary)[currentWordIndex];
    let wordChoice = Object.keys(userDictionary).slice(currentWordIndex, currentWordIndex + 4); // assuming you have a translation available
    useEffect(() => {
        let temp = [];
        const fetchTranslation = async () => {
            //console.log("Inside of useffect");
            for( const dictWord of wordChoice){
                    const translation = await gameClient.getTranslation(username, selectedlanguage, dictWord);
                    console.log("TRANSLATION", translation);
                    if (translation) {
                        //setTranslatedWord(translation[wordChoice[currentWordIndex+i]]);
                        console.log("This is the word:", translation[dictWord]);
                        temp.push(translation[dictWord]);
                       // setTranslatedWord(translation[dictWord]);
                        //translatedWordChoice.push(translation[dictWord]);
                    }
                    
            }
            setTranslatedWord(temp);

        };
    

        fetchTranslation();
    }, [currentWordIndex, chosenWords, selectedlanguage, username, userDictionary]);

    console.log("This is the translated words:", translatedWord);
let wordChoices = translatedWord.slice(currentWordIndex, currentWordIndex + 4); // assuming you have a translation available



    // const [englishword, setEnglishWord] = useState('');

    console.log("This is the user dictionary:", userDictionary);
    console.log("This is the fetched:", fetchedWords);
    console.log("This is the chosen:", chosenWords);
    console.log("This is the keys:", Object.keys(userDictionary));
   // let englishword = Object.keys(userDictionary)[currentWordIndex];
   // let wordChoices = Object.keys(userDictionary).slice(currentWordIndex, currentWordIndex + 4); // assuming you have a translation available



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
        const translation = await gameClient.getTranslation(username, selectedlanguage, key);
        console.log("This is the desired output:", translation[key].toLowerCase());
        console.log("This is the user input", textInput.toLowerCase())
        //console.log("Current word at index:", translatedWord[currentWordIndex])
        //console.log("Current word at 4th word:", translatedWord[currentWordIndex+3])
        if (translatedWord[currentWordIndex].toLowerCase() === translation[key].toLowerCase()) {
            setCorrectMessage("Correct!"); // Set the correct message
            setTimeout(() => {
                showNextWord();
                setCorrectMessage(""); // Clear the message after some time
            }, 1500); // Delay for showing the message
            setIsLastWordCorrect(true);
            await gameClient.upProficiency(username, selectedlanguage, key);
        } else {
            setIsLastWordCorrect(false);
            setCorrectMessage("Try again!"); // Message for incorrect attempt
            setTimeout(() => {
                setCorrectMessage(""); // Clear the message after some time
            }, 1500); // Delay for showing the message
            await gameClient.downProficiency(username, selectedlanguage, key);
        }
        setTextInput("");
    };

    //console.log("page", currentWordIndex);
    console.log("This is the message", correctMessage);
    

    return(  

        <div className = "container">
            
            
            
            {/* Message Display */}
        {correctMessage && (
            <div className="message-display">
                <p>{correctMessage}</p>
            </div>
        )}


            <div className="word-buttons">
    {wordChoices.map((spanishWord, index) => (
        <button key={`${spanishWord}-${index}`} className="word-button" onClick={() => handleEnterClick(englishword)}>
            {spanishWord}
        </button>
    ))}
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



