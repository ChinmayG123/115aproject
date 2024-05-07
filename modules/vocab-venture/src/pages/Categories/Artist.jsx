import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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

const Artist = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { username, language: selectedLanguage } = location.state;

    const [fetchedWords, setFetchedWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState('');
    const [textInput, setTextInput] = useState("");
    const [isLastWordCorrect, setIsLastWordCorrect] = useState(true);
    const [startClicked, setStartClicked] = useState(false);
    const [resume, setResume] = useState(null);
    const [congrats, setCongrats] = useState(false); // Track if the NPC content should be shown

    useEffect(() => {
        const savedIndex = localStorage.getItem('currentWordIndex');
        const initialIndex = savedIndex !== null && resume ? parseInt(savedIndex, 10) : 0;
        const fetchWordsAndTranslations = async () => {
            try {
                const wordsResponse = await gameClient.getAllWordsByCategory(username, "colors");
                const words = Object.values(wordsResponse).flat();
                setFetchedWords(words);
                setCurrentWordIndex(initialIndex);
                if (words.length > 0) {
                    const translation = await gameClient.getTranslation(username, selectedLanguage, words[initialIndex]);
                    setTranslatedWord(translation[words[initialIndex]] || '');
                }
            } catch (error) {
                console.error("Error fetching words:", error);
            }
        };
        fetchWordsAndTranslations();
    }, [username, selectedLanguage, resume]);

    useEffect(() => {
        const fetchTranslation = async () => {
            if (currentWordIndex < fetchedWords.length) {
                const translation = await gameClient.getTranslation(username, selectedLanguage, fetchedWords[currentWordIndex]);
                setTranslatedWord(translation[fetchedWords[currentWordIndex]] || '');
            }
        };
        if (fetchedWords.length > 0) {
            fetchTranslation();
        }
    }, [currentWordIndex, fetchedWords, selectedLanguage, username]);

    const handleResumeChoice = (choice) => {
        setResume(choice);
        if (!choice) {
            localStorage.removeItem('currentWordIndex');
            setCurrentWordIndex(0);
        }
    };

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleEnterClick = async () => {
        if (textInput.toLowerCase() === translatedWord.toLowerCase()) {
            await gameClient.learnNewWord(username, selectedLanguage, fetchedWords[currentWordIndex]);
            setIsLastWordCorrect(true);
            if (currentWordIndex < fetchedWords.length - 1) {
                const newIndex = currentWordIndex + 1;
                setCurrentWordIndex(newIndex);
                localStorage.setItem('currentWordIndex', newIndex.toString());
            }
        } else {
            setIsLastWordCorrect(false);
        }
        if (currentWordIndex === fetchedWords.length - 1) {
            setCongrats(true); 
        }
        setTextInput("");
    };

    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedLanguage } });
    };

    if (resume === null) {
        return (
            <div className="resume-choice">
                <h2>Welcome back, {username}! Would you like to continue where you left off or start learning from the beginning?</h2>
                <button onClick={() => handleResumeChoice(true)}>Continue</button>
                <button onClick={() => handleResumeChoice(false)}>Start Over</button>
            </div>
        );
    }

    return (
        <div className="container">
            <img id="artistbg" src={artistbg} alt="Artist background" />
            <div className="learn-content">
                <img id="learnBG" src={learnBG} alt="Learning background" />
                {fetchedWords.length > 0 && (
                    <div className="learned-words">
                        <h1>English: {fetchedWords[currentWordIndex]}</h1>
                        <h1>{selectedLanguage}: {translatedWord}</h1>
                        <img
                            id="colorImage"
                            src={getColorImageSrc(fetchedWords[currentWordIndex])}
                            alt={fetchedWords[currentWordIndex]}
                        />
                    </div>
                )}
            </div>
            <div className="npc-content">
                {!isLastWordCorrect && <p className="incorrect-message">Incorrect word. Try again!</p>}
                {congrats && isLastWordCorrect && <p className="congrats-message">Congrats! You're done!</p>}
                <img id="npcTextbox" src={npcTextbox} alt="NPC Textbox" />
                <img id="npcimg" src={npcimg} alt="NPC" />
            </div>
            <img id="easelimg" src={easel} alt="Easel" />
            <div className="textdiv">
                {startClicked && (
                    <>
                        <input
                            type="text"
                            className="learnInputBox"
                            placeholder="Enter translation"
                            value={textInput}
                            onChange={handleInputChange}
                        />
                        <button type="button" id="enterbutton" onClick={handleEnterClick}>Enter</button>
                    </>
                )}
                {!startClicked && (
                    <button type="button" id="nextbutton" onClick={() => setStartClicked(true)}>Start Learning</button>
                )}
            </div>
            <button type="button" id="goToMapButton" onClick={goToMap}>Go to Map</button>
        </div>
    );
};

export default Artist;

function getColorImageSrc(colorWord) {
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
}
