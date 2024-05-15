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
    const [wordChoices, setWordChoices] = useState([]);


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
    // console.log("english word", englishword);
    // console.log("wordchoice", wordChoice);
    // useEffect(() => {
    //     let temp = [];
    //     const fetchTranslation = async () => {
    //         //console.log("Inside of useffect");
    //         for( const dictWord of wordChoice){
    //                 const translation = await gameClient.getTranslation(username, selectedlanguage, dictWord);
    //                 console.log("TRANSLATION", translation);
    //                 if (translation) {
    //                     //setTranslatedWord(translation[wordChoice[currentWordIndex+i]]);
    //                     // console.log("This is the word:", translation[dictWord]);
    //                     temp.push(translation[dictWord]);
    //                    // setTranslatedWord(translation[dictWord]);
    //                     //translatedWordChoice.push(translation[dictWord]);
    //                 }
                    
    //         }
    //         setTranslatedWord(temp);

    //     };
    

    //     fetchTranslation();
    // }, [currentWordIndex, chosenWords, selectedlanguage, username, userDictionary]);

    // // console.log("This is the translated words:", translatedWord);
    // let wordChoices = translatedWord.slice(currentWordIndex, currentWordIndex + 4); // assuming you have a translation available
    useEffect(() => {
        const fetchTranslations = async () => {
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
    
            // Generate word choices from translated words
            let choices = temp.slice(0, 4); // Get the first 4 translations
            // while (choices.length < 4) {
            //     choices.push(""); // Fill up the choices array with empty strings if there are less than 4 choices
            // }
            console.log("before", choices);
            const shuffledchoices = Object.entries(choices).sort(() => Math.random() - 0.5 + Math.random() - 0.5).map(([key, value]) => value);
            console.log("shuffled", shuffledchoices);
            setWordChoices(shuffledchoices);

        };
    
        fetchTranslations();
    }, [currentWordIndex, selectedlanguage, userDictionary, username]);
    
    
    // console.log("translated choices", wordChoices);


    // const [englishword, setEnglishWord] = useState('');

    // console.log("This is the user dictionary:", userDictionary);
    // console.log("This is the fetched:", fetchedWords);
    // console.log("This is the chosen:", chosenWords);
    // console.log("This is the keys:", Object.keys(userDictionary));
   // let englishword = Object.keys(userDictionary)[currentWordIndex];
   // let wordChoices = Object.keys(userDictionary).slice(currentWordIndex, currentWordIndex + 4); // assuming you have a translation available



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
        const translation = await gameClient.getTranslation(username, selectedlanguage, englishword);
        console.log("ENGLISH", englishword);
        console.log("This is the desired output:", translation[englishword]);
        console.log("CLICKED", clickedWord);
        if (clickedWord === translation[englishword]) {
            console.log("correct");
            setCorrectMessage("Correct!");
            setTimeout(() => {
                showNextWord();
                setCorrectMessage("");
            }, 1500);
            setIsLastWordCorrect(true);
            await gameClient.upProficiency(username, selectedlanguage, englishword);
        } else {
            console.log("wrong");
            setIsLastWordCorrect(false);
            setCorrectMessage("Try again!");
            setTimeout(() => {
                setCorrectMessage("");
            }, 1500);
            await gameClient.downProficiency(username, selectedlanguage, englishword);
        }
        setTextInput("");
    };
    


    return(  

        <div className = "container">
            
            
        {correctMessage && (
            <div className="message-display">
                <p>{correctMessage}</p>
            </div>
        )}



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

            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     );
};

export default Type;



