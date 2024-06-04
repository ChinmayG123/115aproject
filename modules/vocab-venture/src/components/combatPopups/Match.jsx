
import './Match.css';

import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';



const Match = (props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


  
    const [userDictionary, setUserDictionary] = useState({});
    const [currentWords, setCurrentWords] = useState([]);
    const [currentTranslations, setCurrentTranslations] = useState([]);
    const [correctMessage, setCorrectMessage] = useState("");
    const [selectedEnglishWord, setSelectedEnglishWord] = useState(null);

    const usedWords = useRef(new Set());

    

    useEffect(() => {
        if (props.wordGroupMatch.length > 0) {
            loadNewSet();
        }
    }, [props.wordGroupMatch]);

    const loadNewSet = () => {
        let newWords = props.wordGroupMatch;
        /*
        if (newWords.length < 4) {
            usedWords.current.clear();
            newWords = Object.keys(userDictionary).slice(0, 4);
        }*/

        let newTranslations = [];
        newWords.forEach(async (word) => {
            const translation = await gameClient.getTranslation(username, selectedlanguage, word);
            newTranslations.push(translation);
            if (newTranslations.length === newWords.length) {
                setCurrentWords(newWords);
                setCurrentTranslations(newTranslations.sort(() => Math.random() - 0.5));
            }
        });
        newWords.forEach(word => usedWords.current.add(word));
    };

    const handleWordClick = async (clickedWord, isEnglish) => {
        if (isEnglish) {
            setSelectedEnglishWord(clickedWord);
        } else {
            if (selectedEnglishWord) {
                const translation = await gameClient.getTranslation(username, selectedlanguage, selectedEnglishWord);
                console.log("HERE", translation);

                if (clickedWord === translation) {
                    console.log("correct match");
                    if(currentWords.length === 1){ //if all words matched
                       
                        props.setIsAnswerCorrect(true);
                        setTimeout(() => {
                            props.setIsAttacking(true);
                            setTimeout(() => {
                                props.setIsSlimeHit(true);
                            }, 600)
                        },1000)
                        console.log("All words matched");
                        props.setIsQuestionDone(true);
                        
                    }
                    //setCorrectMessage(currentWords.length === 1 ? "All Words Matched!" : "Correct!");
                   
                    //setCorrectMessage("");
                    setCurrentWords(currentWords.filter(word => word !== selectedEnglishWord));
                    setCurrentTranslations(currentTranslations.filter(word => word !== clickedWord));
                    setSelectedEnglishWord(null);
                    if(currentWords.length > 1){ //only set correct message for the first 3 matches
                        setCorrectMessage("Correct!");
                    }
                    setTimeout(() => {
                        setCorrectMessage("");
                    },1000)
                    gameClient.downProficiency(username, selectedlanguage, selectedEnglishWord); // Call downProficiency()

                        // props.setIsAnswerCorrect(true);
                    props.setCorrectCounter((prevCount) => prevCount + 1); // Increment correct counter


                   
                } else {
                    console.log("Incorrect");

                    setCorrectMessage("Incorrect!");
                        setTimeout(() => {
                            setCorrectMessage("");
                    },1000)
                    // props.setIsAnswerCorrect(false);
                    gameClient.upProficiency(username, selectedlanguage, selectedEnglishWord); // Call downProficiency()

                    props.setWrongCounter((prevCount) => prevCount + 1); // Increment correct counter

                }
                
            }
        }
    };

    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };


    return (props.trigger) ?(
        <div className="match-container">
           

                
            {correctMessage && (
                <div className="message-display-match">
                    <p>{correctMessage}</p>
                </div>
            )}
            <div className="matchCONTENT">
                <div className="word-column">
                    {currentWords.map((englishWord) => (
                        <button
                            key={englishWord}
                            className="word-button"
                            onClick={() => handleWordClick(englishWord, true)}
                        >
                            {englishWord}
                        </button>
                    ))}
                </div>
                <div className="word-column">
                    {currentTranslations.map((translatedWord, index) => (
                        <button
                            key={`${translatedWord}-${index}`}
                            className="word-button"
                            onClick={() => handleWordClick(translatedWord, false)}
                        >
                            {translatedWord}
                        </button>
                    ))}
                </div>
                
            </div>
            <button type="button" id="goToMapButton" onClick={goToMap}>
                Go to Map
            </button>
            <div className="instruction-box">
                <p>Click the English word, then the corresponding translated word.</p>
            </div>
        </div>
    ):"";
};

export default Match;