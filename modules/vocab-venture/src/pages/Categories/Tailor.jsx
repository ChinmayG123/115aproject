// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/tailor-assets/tailor.png';
import learnBG from '../../assets/tailor-assets/contentbox.png';
import npcTextbox from '../../assets/tailor-assets/textbox.png';
import overlayIMG from '../../assets/tailor-assets/sewingTable.png';
import bg from '../../assets/tailor-assets/tailorBG.png';
import './Artist.css';
import './Tailor.css';




// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';

// import React, { useState } from 'react';


const Tailor = function() {

   
    const navigate = useNavigate(); 
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;
  
    const goToMap = () => {
        // navigate('/map', { state: { username } });
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    const [chosenWords, setChosenWords] = useState([]);
    const [fetchedWords, setFetchedWords] = useState([]);
    const [seenWords, setSeenWords] = useState([]);
    const [unseenWords, setUnseenWords] = useState([]);
    const [texts, setTexts] = useState([]);
    const [promptTrigger, setPromptTrigger] = useState(false);
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [translatedWord, setTranslatedWord] = useState('');
    const [userDictionary, setUserDictionary] = useState([]);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [startClicked, setStartClicked] = useState(false);
    //if the user should see new words or practice old ones 
    const [userChoice, setUserChoice] = useState("");

    const [textInput, setTextInput] = useState(""); // State to hold the text input value

    const [isLastWordCorrect, setIsLastWordCorrect] = useState(true); // Track if the last entered word was correct

    const [congrats, setCongrats] = useState(false); // Track if the NPC content should be shown


    useEffect(() => {
        const fetchWords = async () => {
            try {
                const response = await gameClient.getAllWordsByCategory(username, "school");
                const fetchedWords = Object.values(response).flat();

                const fetchedUserDict = await gameClient.getUserDictionary(username, selectedlanguage);
                setUserDictionary(fetchedUserDict || []);
                console.log("Known words: ", fetchedUserDict);

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
            
            if (currentWordIndex < chosenWords.length) {
                const translation = await gameClient.getTranslation(username, selectedlanguage, chosenWords[currentWordIndex]);

                if (translation) {
                    setTranslatedWord(translation[chosenWords[currentWordIndex]]);
                }
                
            }
        };

        fetchTranslation();
    }, [currentWordIndex, fetchedWords, chosenWords, selectedlanguage, username]);

    useEffect(() => {
        const recordSeenAndUnseen = () => {

            let unseenTemp = [];
            let seenTemp = [];
            const dictWords = Object.keys(userDictionary);
            
            for (const categoryWord of Object.values(fetchedWords)) {
                //if the user has not seen this word 
                if (dictWords.indexOf(categoryWord) == -1){
                    unseenTemp.push(categoryWord);
                    console.log("pushed ", categoryWord, " to unseen");
                }
                else{
                    seenTemp.push(categoryWord);
                    console.log("pushed ", categoryWord, " to seen");
                }
            } 
            setUnseenWords(unseenTemp);
            setSeenWords(seenTemp);
        }
        recordSeenAndUnseen();
    }, [fetchedWords, username, selectedlanguage]);

    //condition to decide whether to show the prompt 

    
    const greetings = {
        'spanish': 'Hola',
        'french': 'Bonjour',
    };

    
    const greeting = greetings[selectedlanguage] || 'Hello'; 

    useEffect(() =>{
        const decideTextTree = () =>{
            //if the user has seen all the words, 
            //only greet the user
            let t = [];
            if(unseenWords.length == 0){
                t = [`${greeting}! Practicing again?`];
                setUserChoice("both");    //show fetchedWords 
                
            }
            //if user has never seen any of the words
            else if(unseenWords.length == fetchedWords.length){
                t = [
                    `${greeting} ${username}!`,
                    "I've got some time, let me teach you about clothing.",
                    "Let's begin."
                ];
                setUserChoice("learn");

            }
            //user has seen only some of the words
            //ACTIVATE PROMPT 
            else{
                t = [`Welcome back ${username}!`,
                `Would you like to practice old words, learn new words, or both?`];
                setUserChoice("prompt");
            }
            setTexts(t);
            
        }
        decideTextTree();
    }, [unseenWords, seenWords, username, selectedlanguage]);



    const showNextText = () => {
        if (currentTextIndex < texts.length - 1) {
            setCurrentTextIndex(currentTextIndex + 1);
        }
    };
  

    const showNextWord = () => {
        if (currentWordIndex < chosenWords.length - 1) {
            setCurrentWordIndex(currentWordIndex + 1);
        } 
    };
    
    
   


    const handleStartClick = () => {
        if(currentTextIndex == texts.length -1){
            
            setPromptTrigger(false);
            setStartClicked(true);
        }
        else if (currentTextIndex == texts.length - 2){

            console.log("prompt condition check");
            showNextText();
            if(userChoice.localeCompare("prompt") == 0){
                
                setPromptTrigger(true);
            }    
        }
        else if (currentTextIndex < texts.length - 1) {
            showNextText();
        } 
        
    };
    

    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setTextInput(newValue); // Update the text input value as the user types
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
   useEffect(() => {
    //console.log("SHUFFLED ",chosenWords);
    if(currentTextIndex > 0){
        handleStartClick();
    }
   },[chosenWords])


    useEffect(() => {

        console.log("user choice changed: ", userChoice);
        if(userChoice.localeCompare("practice") == 0){
            //setChosenWords(seenWords);
            randomizeWords(seenWords);
        }
        else if(userChoice.localeCompare("learn") == 0){
            //setChosenWords(unseenWords);
            randomizeWords(unseenWords);
        }
        else{
            randomizeWords(fetchedWords);
            //setChosenWords(fetchedWords);
        }


    }, [userChoice, unseenWords, seenWords, fetchedWords]);
    
        
    const changeToPractice = () => {
        setUserChoice("practice");
    }
    const changeToBoth = () => {
        setUserChoice("both");
    }
    const changeToLearn = () => {
        setUserChoice("learn");
        //console.log(userChoice);
    }
    const handleEnterClick = async () => {
        if (textInput.toLowerCase() === translatedWord.toLowerCase()) {
            await gameClient.learnNewWord(username, selectedlanguage, chosenWords[currentWordIndex]);
            showNextWord();
            setIsLastWordCorrect(true); // Set the state to true if the word is correct
        } else {
            console.log("Incorrect word. Try again!");
            setIsLastWordCorrect(false); // Set the state to false if the word is incorrect
        }
    
        if (currentWordIndex === chosenWords.length - 1) {
            setCongrats(true); 
        }
        setTextInput(""); // Clear the text input after checking
    };
    

    return(  

        <div className = "container">
            
              
            <img id= "bg" src={bg}></img>
            
            {/*image display div*/}
            <div className="learn-content">
                <img id="learnBG" src={learnBG} />
                <div className="learned-words">
                 <ul>
                        
                        <h1>English: {chosenWords[currentWordIndex]}</h1>
                        <br></br>
                        <h1>{selectedlanguage}: {translatedWord}</h1>
                    </ul>
                </div>

               
            </div>
          
            <div className="npc-content">   
            <img id="npcimg" src={npcimg} alt="npc image" />

                            {!isLastWordCorrect && <p className="incorrect-message">Incorrect word. Try again!</p>}
                            {congrats && isLastWordCorrect && <p className="congrats-message">Congrats! You're done!</p>}
                            {!startClicked && <p>{texts[currentTextIndex]}</p>}
                            <img id="npcTextbox" src={npcTextbox} alt="NPC Textbox" />
            </div>
            <img id= "sewingTable" src={overlayIMG}></img>            
            
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
            ) : ( promptTrigger ? (
                
                <div className="textdiv">
                    <button type= "button" id="PracticeSeenWordsBtn" onClick = {changeToPractice} >Practice</button>
                    <button type= "button" id="LearnNewWordsBtn" onClick = {changeToLearn}>Learn</button>
                    <button type= "button" id="BothBtn"onClick= {changeToBoth}>Both</button>

                </div>

            ): 
            <button type= "button" id="nextbutton" onClick = {handleStartClick}>Next</button>
            )}

            <button type="button" id="goToMapButton" onClick={goToMap}>
                Go to Map
            </button>
                
        </div>
    
     );
};

export default Tailor;



