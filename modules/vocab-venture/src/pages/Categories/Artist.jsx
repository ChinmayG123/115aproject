// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './Artist.css';

// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

// import React, { useState } from 'react';



const Artist = function() {

    const navigate = useNavigate(); 

    const goToMenu =() => {navigate('/home')};


    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;

    const [fetchedWords, setFetchedWords] = useState([]);
    const [currentWordIndex, setCurrentWordIndex] = useState(0); // Track current word index


    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await gameClient.getAllWordsByCategory(username, "colors");
                const fetchedWords = Object.values(response).flat();
                console.log("Fetched words:", fetchedWords);
                setFetchedWords(fetchedWords || []);
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


    const [currentTextIndex, setCurrentTextIndex] = useState(0);



    const showNextText = () => {
        if (currentTextIndex < texts.length - 1) {
            setCurrentTextIndex(currentTextIndex + 1);
        }
    };


    const showNextWord = () => {
        if (currentWordIndex < fetchedWords.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } else {
            setCurrentWordIndex(0); // Reset to the first word
        }
    };
    

    


    const showPreviousWord = () => {
        if (currentWordIndex > 0) {
            setCurrentWordIndex(currentWordIndex - 1);
        } else {
            setCurrentWordIndex(fetchedWords.length - 1); // Go to the last word
        }
    };
    
    

    return(  

        <div className = "container">
            
              
            <img id= "artistbg" src={artistbg}></img>

            <div className="learn-content">
                <img id="learnBG" src={learnBG} />
                {/* <div className="learned-words">
                    <h2>Words:</h2>
                    <ul>
                        {fetchedWords.map((word, index) => (
                            <li key={index}>{word}</li>
                        ))}
                    </ul>
                </div> */}
                <div className="learned-words">
                    <h2>Words:</h2>
                    <ul>
                        <li>{fetchedWords[currentWordIndex]}</li>
                    </ul>
                </div>


            </div>
            <div className = "npc-content">

                <p>{texts[currentTextIndex]}</p>
                <img id="npcTextbox" src={npcTextbox} alt="npc text box" />
                <img id="npcimg" src={npcimg} alt="npc image" />
                
            </div>

            <img id= "easelimg" src={easel}></img>
            <div className= "textdiv">
                <input type="text" className = "learnInputBox" placeholder='text'/>
            </div>

            <button type="button" id="nextbutton" onClick={showNextText}>
                {currentTextIndex === texts.length - 1 ? "Start" : "Next"}
            </button>

            <button
                type="button"
                id="wordbutton"
                onClick={showNextWord}
                disabled={currentWordIndex === fetchedWords.length - 1}
            >
                Next Word
            </button>


            <button
                type="button"
                id="previouswordbutton"
                onClick={showPreviousWord}
                disabled={currentWordIndex === 0}
            >
                Previous
            </button>

                  
        </div>
    
     );
};

export default Artist;



