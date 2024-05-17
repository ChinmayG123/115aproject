import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './Match.css';

import { useNavigate, useLocation } from 'react-router-dom';
import React, { useState, useEffect, useRef } from 'react';

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

const Match = () => {
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

    const getTheUserInformation = async (username, language) => {
        try {
            const result = await gameClient.getUserDictionary(username, language);
            return result;
        } catch (error) {
            console.error('An error occurred while fetching user information:', error);
            return {};
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
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

    useEffect(() => {
        if (Object.keys(userDictionary).length > 0) {
            loadNewSet();
        }
    }, [userDictionary]);

    const loadNewSet = () => {
        let newWords = Object.keys(userDictionary).filter(word => !usedWords.current.has(word)).slice(0, 4);

        if (newWords.length < 4) {
            usedWords.current.clear();
            newWords = Object.keys(userDictionary).slice(0, 4);
        }

        let newTranslations = [];
        newWords.forEach(async (word) => {
            const translation = await gameClient.getTranslation(username, selectedlanguage, word);
            newTranslations.push(translation[word]);
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
                if (clickedWord === translation[selectedEnglishWord]) {
                    setCorrectMessage(currentWords.length === 1 ? "All Words Matched!" : "Correct!");
                    setTimeout(() => {
                        setCorrectMessage("");
                        setCurrentWords(currentWords.filter(word => word !== selectedEnglishWord));
                        setCurrentTranslations(currentTranslations.filter(word => word !== clickedWord));
                        setSelectedEnglishWord(null);
                        if (currentWords.length === 1) {
                            setTimeout(loadNewSet, 1500);
                        }
                    }, 1500);
                } else {
                    setCorrectMessage("Try again!");
                    setTimeout(() => {
                        setCorrectMessage("");
                        setSelectedEnglishWord(null);
                    }, 1500);
                }
            }
        }
    };

    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    return (
        <div className="match-container">
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
                {correctMessage && (
                    <div className="match-message-display">
                        <p>{correctMessage}</p>
                    </div>
                )}
            </div>
            <button type="button" id="goToMapButton" onClick={goToMap}>
                Go to Map
            </button>
            <div className="instruction-box">
                <p>Click the English word, then the corresponding translated word.</p>
            </div>
        </div>
    );
};

export default Match;