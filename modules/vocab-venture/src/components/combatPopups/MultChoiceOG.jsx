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





/**
 * Multiple Choice Question Component.
 * 
 * @param {object} props - The props for the component.
 * @param {string} props.questionType - The type of question.
 */
const MultChoiceOG = ({ questionType }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;
    const difficulty = location.state.difficulty;

    /**
     * Get the initial timer based on the difficulty level.
     * 
     * @param {string} difficulty - The difficulty level.
     * @returns {number} The initial timer value.
     */
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

    /**
     * Navigate to the map page.
     */
    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    // State variables
    const [currentWord, setCurrentWord] = useState(null);
    const [correctMessage, setCorrectMessage] = useState("");
    const [timer, setTimer] = useState(getInitialTimer(difficulty));
    const [nextWord, getNextWord] = useState(false);

    /**
     * Fetch a new question word and its multiple-choice options.
     */
    const fetchQuestion = async () => {
        try {
            const questionWord = await gameClient.getQuestionWord(username, selectedlanguage, 1);
            if (questionWord) {
                const [correctIndex, choices] = await gameClient.getMultipleChoice(username, selectedlanguage, questionWord);
                setCurrentWord({ english: questionWord, correctIndex, choices });
            }
        } catch (error) {
            console.error('Error fetching question word:', error);
        }
    };

    // Fetch question when component mounts or when nextWord changes
    useEffect(() => {
        fetchQuestion();
    }, [nextWord, username, selectedlanguage]);

    /**
     * Handle the click event for a word choice.
     * 
     * @param {string} clickedWord - The word that was clicked.
     */
    const handleEnterClick = async (clickedWord) => {
        const initialTimer = getInitialTimer(difficulty);
        const { english, correctIndex, choices } = currentWord;
        const correctWord = choices[correctIndex];

        if (clickedWord === correctWord) {
            setCorrectMessage("Correct!");
            getNextWord(!nextWord);
            setTimeout(() => {
                setCorrectMessage(""); // Reset message
                setTimer(initialTimer); // Reset timer to initial value
            }, 1000);
        } else {
            setCorrectMessage("Try again!");
            setTimeout(() => {
                setCorrectMessage(""); // Reset message
            }, 500);
            await gameClient.upProficiency(username, selectedlanguage, english);
            setTimer(initialTimer);
        }
    };

    // Timer countdown logic
    useEffect(() => {
        const interval = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer > 0 && !correctMessage) {
                    return prevTimer - 1;
                } else if (prevTimer > 0 && correctMessage) {
                    return prevTimer;
                } else {
                    clearInterval(interval); // Stop the interval
                    setTimeout(() => {
                        gameClient.downProficiency(username, selectedlanguage, currentWord.english); // Call downProficiency()
                        setTimer(getInitialTimer(difficulty)); // Reset timer to initial value
                        setCorrectMessage("Time Out!");
                    }, 2000);
                    return 0; // Set timer to 0 to display "Time is up!"
                }
            });
        }, 1000); // Update timer every second

        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [currentWord, correctMessage, difficulty, username, selectedlanguage]);

    return (
        <div className="container">
            <div className="timer">
                <h1>Timer: {timer === 0 ? "Time is up!" : timer}</h1>
            </div>
            {currentWord && (
                <div className="learned-words1">
                    <div key={currentWord.english} className="word-container">
                        <div className="image-container">
                            {getWordImageSrc(currentWord.english) && (
                                <img
                                    id="wordImage1"
                                    src={getWordImageSrc(currentWord.english)}
                                    alt={currentWord.english}
                                />
                            )}
                        </div>
                        <div className="word-info">
                            <h1 style={{ marginTop: '300px', marginLeft: '550px' }} >English: {currentWord.english}</h1>
                        </div>
                    </div>
                    <div className="word-buttons">
                        {currentWord.choices.map((choice, index) => (
                            <button key={`${choice}-${index}`} className="word-button" onClick={() => handleEnterClick(choice)}>
                                {choice}
                            </button>
                        ))}
                    </div>
                </div>
            )}
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