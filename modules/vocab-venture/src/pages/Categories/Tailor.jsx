// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/tailor-assets/tailor.png';
import learnBG from '../../assets/tailor-assets/contentbox.png';
import npcTextbox from '../../assets/tailor-assets/textbox.png';
import sewingTable from '../../assets/tailor-assets/sewingTable.png';
import tailorbg from '../../assets/tailor-assets/tailorBG.png';
import './Artist.css';
import './Tailor.css';




// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

// import React, { useState } from 'react';


const Tailor = function() {

    const navigate = useNavigate(); 

    // const goToMap = () => {
    //     navigate('/map', { state: { username } });
    // };
    

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


    const [fetchedWords, setFetchedWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState('');

    const [currentTextIndex, setCurrentTextIndex] = useState(0);


    const goToMap = () => {
        // navigate('/map', { state: { username } });
        navigate('/map', { state: { username, language: selectedlanguage } });
    };


    const [startClicked, setStartClicked] = useState(false);


    const [textInput, setTextInput] = useState(""); // State to hold the text input value

    const [isLastWordCorrect, setIsLastWordCorrect] = useState(true); // Track if the last entered word was correct

    const [congrats, setCongrats] = useState(false); // Track if the NPC content should be shown


    // useEffect(() => {
    //     const fetchWords = async () => {
    //         try {
    //             const response = await gameClient.getAllWordsByCategory(username, "locations");
    //             const fetchedWords = Object.values(response).flat();
    //             console.log("Fetched words:", fetchedWords);
    //             setFetchedWords(fetchedWords || []);
    //         } catch (error) {
    //             console.error("Error fetching words:", error);
    //         }
    //     };
        

    //     fetchWords();
    // }, []);
    


    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await gameClient.getAllWordsByCategory(username, "clothing");
                const fetchedWords = Object.values(response).flat();
                console.log("Fetched words:", fetchedWords);
                setFetchedWords(fetchedWords || []);

            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };

        fetchWords();
    }, []);

    
    useEffect(() => {
        const fetchTranslation = async () => {
            console.log("okay");

            if (currentWordIndex < fetchedWords.length) {
                const translation = await gameClient.getTranslation(username, selectedlanguage, fetchedWords[currentWordIndex]);
                console.log(username, selectedlanguage, fetchedWords[currentWordIndex]);
                console.log("hi", translation);
                console.log("hello", translation[fetchedWords[currentWordIndex]]);
                    
                if (translation) {
                    setTranslatedWord(translation[fetchedWords[currentWordIndex]]);
                }
                // console.log(translation[fetchedWords[currentWordIndex]]);
            }
        };

        fetchTranslation();
    }, [currentWordIndex, fetchedWords, selectedlanguage, username]);




    const greetings = {
        'spanish': 'Hola',
        'french': 'Bonjour',
    };


    const greeting = greetings[selectedlanguage] || 'Hello'; 




    const texts = [
        `${greeting} ${username}!`,
        "We will learn locations here!",
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
        if (textInput.toLowerCase() === translatedWord.toLowerCase()) {
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
    



    return(  

        <div className = "container">
            
            <img id= "artistbg" src={tailorbg}></img>

            <div className="learn-content">
                <img id="learnBG" src={learnBG} />


                <div className="learned-words">
                    <ul>
                        <h1>English: {fetchedWords[currentWordIndex]}</h1>
                        <br></br>
                        <h1>{selectedlanguage}: {translatedWord}</h1>
                        {/* <p>{translations[fetchedWords[currentWordIndex]]}</p> */}
                    </ul>
                </div>

{/* 
                <div className="learned-words">
                    <h2>Words:</h2>
                    <ul>
                        <li>{fetchedWords[currentWordIndex]}</li>
                    </ul>
                </div> */}


            </div>

              
            <div className="npc-content">
                {!isLastWordCorrect && <p className="incorrect-message">Incorrect word. Try again!</p>}
                {congrats && isLastWordCorrect && <p className="congrats-message">Congrats! You're done!</p>}
                {!startClicked && <p>{texts[currentTextIndex]}</p>}


                <img id="tailornpcimg" src={npcimg} alt="npc image" />
                <img id= "sewingTable" src={sewingTable}></img>
                <img id="npcTextbox" src={npcTextbox} alt="npc text box" />
                


            </div>
            
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

export default Tailor;



