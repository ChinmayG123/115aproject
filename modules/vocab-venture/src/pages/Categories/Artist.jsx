// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './Artist.css';
import blue from '../../assets/dict-images/colors/blue.png';
import black from '../../assets/dict-images/colors/black.png';
import brown from '../../assets/dict-images/colors/brown.png';
import green from '../../assets/dict-images/colors/green.png';
import orange from '../../assets/dict-images/colors/orange.png';
import red from '../../assets/dict-images/colors/red.png';
import white from '../../assets/dict-images/colors/white.png';
import yellow from '../../assets/dict-images/colors/yellow.png';


// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

// import React, { useState } from 'react';



const Artist = function() {

    const navigate = useNavigate(); 

    const goToMap = () => {
        navigate('/map', { state: { username } });
    };

    // Navigate to the Artist component with the username as a prop
    // const goToMap = () => {
    //     // navigate('/artist', { state: { username } });
    //     navigate('/map', { state: { username, language: selectedLanguage } });

    // };


    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;

    const [fetchedWords, setFetchedWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track current word index


    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const [startClicked, setStartClicked] = useState(false);


    const [textInput, setTextInput] = useState(""); // State to hold the text input value

    const [isLastWordCorrect, setIsLastWordCorrect] = useState(true); // Track if the last entered word was correct

    const [congrats, setCongrats] = useState(false); // Track if the NPC content should be shown

    const [translations, setTranslations] = useState({});


    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await gameClient.getAllWordsByCategory(username, "colors");
                const fetchedWords = Object.values(response).flat();
                console.log("Fetched words:", fetchedWords);
                setFetchedWords(fetchedWords || []);
                
            // Fetch translations for each word
            const translations = [];
            for (let i = 0; i < fetchedWords.length; i++) {
                const word = fetchedWords[i];
                const translationResponse = await gameClient.getTranslation(username, selectedlanguage, word);
                if (translationResponse) {
                    translations.push(translationResponse.translation);
                } else {
                    translations.push("Translation not available");
                }

                // Check if we reached the end of fetchedWords
                if (i === fetchedWords.length - 1) {
                    console.log("Reached end of fetchedWords, skipping translation fetch.");
                    break;
                }
            }
            setTranslations(translations);

            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };
        

        fetchWords();
    }, []);
    

    const greetings = {
        'spanish': 'Hola',
        'french': 'Bonjour',
    };


    const greeting = greetings[selectedlanguage] || 'Hello'; 




    const texts = [
        `${greeting} ${username}!`,
        "We will learn about colors here!",
        "Let's begin!"
    ];



    const showNextText = () => {
        if (currentTextIndex < texts.length - 1) {
            setCurrentTextIndex(currentTextIndex + 1);
        }
    };


    const showNextWord = () => {
        if (currentWordIndex < fetchedWords.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } 
    };
    


    const handleStartClick = () => {
        if (currentTextIndex < texts.length - 1) {
            showNextText();
        } else {
            
            setStartClicked(true);

        }
    };
    


    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setTextInput(newValue); // Update the text input value as the user types
    };
    const handleEnterClick = async () => {
        if (textInput.toLowerCase() === fetchedWords[currentWordIndex].toLowerCase()) {
            await gameClient.learnNewWord(username, selectedlanguage, fetchedWords[currentWordIndex]);
            showNextWord();
            setIsLastWordCorrect(true); // Set the state to true if the word is correct
        } else {
            console.log("Incorrect word. Try again!");
            setIsLastWordCorrect(false); // Set the state to false if the word is incorrect
        }
    
        if (currentWordIndex === fetchedWords.length - 1) {
            setCongrats(true); 
        }
        setTextInput(""); // Clear the text input after checking
    };
    


    // const getColorImageSrc = (colorWord) => {
    //     // Construct the path to the image based on the color word
    //     console.log(colorWord);
    //     return `../../assets/dict-images/colors/${colorWord}.png`;
    // };

    const getColorImageSrc = (colorWord) => {
        switch (colorWord) {
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
            default:
                return null;
        }
    };

    return(  

        <div className = "container">
            
              
            <img id= "artistbg" src={artistbg}></img>

            <div className="learn-content">
                <img id="learnBG" src={learnBG} />
                <div className="learned-words">
                    <ul>
                        <h1>{fetchedWords[currentWordIndex]}</h1>
                        <p>{translations[fetchedWords[currentWordIndex]]}</p>

                    </ul>
                </div>

                {fetchedWords[currentWordIndex] && (
                <img
                    id="colorImage"
                    src={getColorImageSrc(fetchedWords[currentWordIndex])}
                    alt={fetchedWords[currentWordIndex]}
                />
            )}



            </div>

            <div className="npc-content">
                {!isLastWordCorrect && <p className="incorrect-message">Incorrect word. Try again!</p>}
                {congrats && isLastWordCorrect && <p className="congrats-message">Congrats! You're done!</p>}
                {!startClicked && <p>{texts[currentTextIndex]}</p>}
                <img id="npcTextbox" src={npcTextbox} alt="npc text box" />
                <img id="npcimg" src={npcimg} alt="npc image" />

            </div>


            <img id= "easelimg" src={easel}></img>

            <div className="textdiv"></div>

            {startClicked ? (
                <>
                    <div className="textdiv">
                        <input
                            type="text"
                            className="learnInputBox"
                            placeholder="text"
                            value={textInput}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="button" id="enterbutton" onClick={handleEnterClick}>
                        Enter
                    </button>
                </>
            ) : (
                <button type="button" id="nextbutton" onClick={handleStartClick}>
                    {currentTextIndex === texts.length - 1 ? "Start" : "Next"}
                </button>
            )}

            {/* {congrats && isLastWordCorrect && ( 
                <button type="button" id="goToMapButton" onClick={goToMap}>
                    Go to Map
                </button>

            )} */}

            <button type="button" id="goToMapButton" onClick={goToMap}>
                Go to Map
            </button>
                
        </div>
    
     );
};

export default Artist;



