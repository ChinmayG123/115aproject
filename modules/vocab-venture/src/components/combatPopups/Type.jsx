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

    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;
  
    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

//     const [chosenWords, setChosenWords] = useState([]);
//     const [fetchedWords, setFetchedWords] = useState([]);
//     const [seenWords, setSeenWords] = useState([]);
//     const [unseenWords, setUnseenWords] = useState([]);
//     const [texts, setTexts] = useState([]);
//     const [promptTrigger, setPromptTrigger] = useState(false);
//     const [currentWordIndex, setCurrentWordIndex] = useState(0);
//     const [translatedWord, setTranslatedWord] = useState('');
    
//     //the user's dictionary 
//     const [userDictionary, setUserDictionary] = useState([]);


//     const [currentTextIndex, setCurrentTextIndex] = useState(0);

//     const [startClicked, setStartClicked] = useState(false);

//     //if the user should see new words or practice old ones 
//     const [userChoice, setUserChoice] = useState("");

//     const [textInput, setTextInput] = useState(""); 

//     const [isLastWordCorrect, setIsLastWordCorrect] = useState(true); 

//     const [congrats, setCongrats] = useState(false); 
    

//     const getTheUserInformation = async (username, language) => {
//         try {
//             const result = await gameClient.getUserDictionary(username, language);
//             // return { status: 'success' };
//             return result;
//             // return { status: 'success', result: result };
//         } catch (error) {
//             return { status: 'error', message: 'An error occurred during login. Please try again.' };
//         }
//       }

//   useEffect(() => {
//     const fetchData = async () => {
        
//         const result = await getTheUserInformation(props.username, selectedLanguage);
//         setUserDictionary(result);
//         setCurrentPage(0); 

//       // Fetch translations
//       const translationsObject = {};
//       for (const [key, _] of Object.entries(result)) {
//         console.log("key", key);
//         const translation = await gameClient.getTranslation(props.username, selectedLanguage, key);
//         console.log("translate", translation);
//         translationsObject[key] = translation;
//       }
//       setTranslations(translationsObject);

//     }
//     fetchData();
// }, [props.username, selectedLanguage]);


//     const showNextText = () => {
//         if (currentTextIndex < texts.length - 1) {
//             setCurrentTextIndex(currentTextIndex + 1);
//         }
//     };
  

//     const showNextWord = () => {
//         if (currentWordIndex < chosenWords.length - 1) {
//             setCurrentWordIndex(currentWordIndex + 1);
//         } 
//     };
    


//     const handleInputChange = (event) => {
//         const newValue = event.target.value;
//         setTextInput(newValue); // Update the text input value as the user types
//     };

    
//    const randomizeWords = (array) =>{
//         // Create a copy of the array
//         const shuffledArray = array.slice();
//         // Shuffle the copy
//         for (let i = shuffledArray.length - 1; i > 0; i--) {
//             const j = Math.floor(Math.random() * (i + 1));
//             [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
//         }
//         // Update state with the shuffled array
//         setChosenWords(shuffledArray);
//         console.log("shuffled words: ", shuffledArray);
//    }


//    useEffect(() => {
//     //console.log("SHUFFLED ",chosenWords);
//     if(currentTextIndex > 0){
//         handleStartClick();
//     }
//    },[chosenWords])


//     useEffect(() => {

//         console.log("user choice changed: ", userChoice);
//         if(userChoice.localeCompare("practice") == 0){
//             //setChosenWords(seenWords);
//             randomizeWords(seenWords);
//         }
//         else if(userChoice.localeCompare("learn") == 0){
//             //setChosenWords(unseenWords);
//             randomizeWords(unseenWords);
//         }
//         else{
//             randomizeWords(fetchedWords);
//             //setChosenWords(fetchedWords);
//         }


//     }, [userChoice, unseenWords, seenWords, fetchedWords]);
    


//     const handleEnterClick = async () => {
//         if (textInput.toLowerCase() === translatedWord.toLowerCase()) {
//             await gameClient.learnNewWord(username, selectedlanguage, chosenWords[currentWordIndex]);
//             showNextWord();
//             setIsLastWordCorrect(true); // Set the state to true if the word is correct
//         } else {
//             console.log("Incorrect word. Try again!");
//             setIsLastWordCorrect(false); // Set the state to false if the word is incorrect
//         }
    
//         if (currentWordIndex === chosenWords.length - 1) {
//             setCongrats(true); 
//         }
//         setTextInput(""); // Clear the text input after checking
//     };
    


    return(  

        <div className = "container">

              
            {/* <img id= "artistbg" src={artistbg}></img>
            
            <div className="learn-content">
                <img id="learnBG" src={learnBG} />
                <div className="learned-words">
                 <ul>
                        
                        <h1>English: {chosenWords[currentWordIndex]}</h1>
                        <br></br>
                        <h1>{selectedlanguage}: {translatedWord}</h1>
                    </ul>
                </div>

                {chosenWords[currentWordIndex] && (
                <img
                    id="colorImage"
                    src={getWordImageSrc(chosenWords[currentWordIndex])}
                    alt={chosenWords[currentWordIndex]}
                />
            )}

            </div>


            <div className="textdiv"></div>
            
            
            <button type= "button" id="nextbutton" onClick = {handleStartClick}>Next</button> */}


            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     );
};

export default Type;



