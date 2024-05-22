// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';

import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './MultChoice.css';
import cat from '../../assets/outskirts-assets/testSS.png';
import catHIT from '../../assets/outskirts-assets/catHitSS.png';
import catATTACK from '../../assets/outskirts-assets/catAttackSS.png';
import './Quiz.css';
import TypePopup from '../combatPopups/Type';
import MCPopup from '../combatPopups/MultChoice';
import MatchPopup from '../combatPopups/Match';


// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
import Match from '../combatPopups/Match';


const Quiz = () => {
    //const [timer, setTimer] = useState(10000000); // Initial timer value in seconds
    const [running, setRunning] = useState(false);
    const [typePopup, setTypePopup] = useState(false);
    const [mcPopup, setMcPopup] = useState(false);
    const [matchPopup, setMatchPopup] = useState(false);
    const [isHit, setIsHit] = useState(false);
    const [isAttacking, setIsAttacking] = useState(false);
    const [userDictionary, setUserDictionary] = useState([]);
    const [wordToShow, setWordToShow] = useState('');
    const [isAnswerCorrect, setIsAnswerCorrect] = useState(false); 
    const [isStartClicked, setIsStartClicked] = useState(false);
    const [isQuestionDone, setIsQuestionDone] = useState(false); //if the time runs out or answers correctly/incorrectly this will be true
    const [currentDictIndex, setCurrentDictIndex] = useState(0);
    const [shuffledDictKeys, setShuffledDictKeys] = useState([]);
    const [qType, setQType] = useState(0); //0 is mult choice, 1 type, 2 match
    const [wordGroup, setWordGroup] = useState([]); //store 4 words to pass to mult choice and matching

    const navigate = useNavigate(); 
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;


    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

    const getTheUserInformation = async (username, language) => {
        try {
            const result = await gameClient.getUserDictionary(username, language);
            return result;
        } catch (error) {
            return { status: 'error', message: 'An error occurred during login. Please try again.' };
        }
      }

      //run every time the user finished a question
      useEffect(() => {
        if(isAnswerCorrect == false && isQuestionDone ==true){
            console.log("wrong answer");
            getNextQuestion();

        }
        else if(isAnswerCorrect == true && isQuestionDone == true){
            console.log("correct answer");
            getNextQuestion();

        }
    
      }, [isQuestionDone])

      useEffect(() => {
        const fetchData = async () => {
            try {
                console.log(username, selectedlanguage);
                const result = await getTheUserInformation(username, selectedlanguage);
                if (!result) {
                    console.error('User dictionary is empty or undefined.');
                    return;
                }

                console.log("result", result);


                // Shuffle the entries (key-value pairs) in the dictionary
                const shuffledEntries = Object.entries(result).sort(() => Math.random() - 0.5);
                const shuffledDictionary = Object.fromEntries(shuffledEntries);

                console.log("shuffledDictionary", shuffledDictionary);
                setUserDictionary(shuffledDictionary); //set user dictionary (includes proficiencies)
                
            } catch (error) {
                console.error('An error occurred while fetching user information:', error);
            }
        };
        fetchData();
    }, [username, selectedlanguage]);
    
  
    //load the dictionary into the shuffledDictKeys variable
    useEffect(() => {
        setShuffledDictKeys(Object.keys(userDictionary));
    },[userDictionary]);

    useEffect(() => {
        if(isStartClicked == true && isQuestionDone == false){
            if(qType == 0){
                console.log("Word group passed to MC ", wordGroup);
                setMcPopup(true);
                setTypePopup(false);
                setMatchPopup(false);
            }
            else if(qType == 1){
                console.log("Word being passed to Type: ", wordToShow);
                setTypePopup(true);
                setMcPopup(false);
                setMatchPopup(false);
            }
            else if(qType == 2){
                console.log("Word Group being passed to Match: ", wordGroup);
                setMatchPopup(true);
                setMcPopup(false);
                setTypePopup(false);
            }
        }
    },[qType, isStartClicked]);


    const handleStartClick = () =>{
        setIsStartClicked(true);
        getNextQuestion();
    }
       
    const sendWords = (numWords) =>{
        //console.log("shuffled keys",shuffledDictKeys);

            console.log("current dictionary index: ", currentDictIndex);
            setWordToShow(shuffledDictKeys[currentDictIndex]);
            //console.log(shuffledDictKeys);

            let next4Words = shuffledDictKeys.slice(currentDictIndex, currentDictIndex + 4)
            console.log("INIT ", next4Words);
            let wordGroupLen = next4Words.length;
            console.log("WG LEN ",wordGroupLen);
            if (wordGroupLen < 4){
                next4Words = next4Words.concat(shuffledDictKeys.slice(0, 4-wordGroupLen));
            }
            console.log("AFTER ", next4Words);
            setWordGroup(next4Words);
            setCurrentDictIndex((currentDictIndex + numWords) % shuffledDictKeys.length);


    }


    const playAttackAnim = () =>{
        return(
            <img onAnimationEnd= {handleEndAnimation} className = "catAttackSS" src={catATTACK}></img>
    
     )
    }
    const playHitAnim = () =>{
        return(
            <img onAnimationEnd= {handleEndAnimation} className = "catHitSS" src={catHIT}></img>
    
     )
        
    }

    const handleEndAnimation = () =>{
        setIsHit(false);
        setIsAttacking(false);
     
    }
    const playIdleAnim = () => {
        return( <img className= "catSS" src= {cat} ></img>)
    }

    
    const getNextQuestion = () => {

        setIsQuestionDone(false);
        
        let q = Math.floor(Math.random() * 3)
        setQType(q);
        console.log("Question: ", q);
        sendWords(1); //num words to send, */
        
        
    }
    
    
    return(  
        <div className = "combatBackground">
            
            <div className = "Sprite"> {isHit ? playHitAnim():
            (isAttacking ? playAttackAnim(): playIdleAnim())
            } 
            </div>
            {isStartClicked ? 
            <div></div>
            :
            <div className = "start-btn">
                <button type="button" onClick= {() => handleStartClick()}> 
                        START            
                </button>
            </div>}
            
            <TypePopup trigger = {typePopup} setTrigger={setTypePopup} username={username} selectedLanguage={selectedlanguage}
            setIsHit = {setIsHit} setIsAttacking = {setIsAttacking} wordToShow = {wordToShow} setIsAnswerCorrect = {setIsAnswerCorrect} setIsQuestionDone = {setIsQuestionDone}>
            </TypePopup>
            <MCPopup trigger = {mcPopup} setTrigger= {setMcPopup}username={username} selectedLanguage={selectedlanguage}
            setIsHit = {setIsHit} setIsAttacking = {setIsAttacking} wordToShow = {wordToShow} setIsAnswerCorrect = {setIsAnswerCorrect} setIsQuestionDone = {setIsQuestionDone} wordGroup = {wordGroup}>
            </MCPopup>
            <MatchPopup trigger = {matchPopup} setTrigger= {setMatchPopup}username={username} selectedLanguage={selectedlanguage}
            setIsHit = {setIsHit} setIsAttacking = {setIsAttacking} setIsAnswerCorrect = {setIsAnswerCorrect} setIsQuestionDone = {setIsQuestionDone} wordGroup = {wordGroup}>
            </MatchPopup>

        </div>
 
     
    
     );
};

export default Quiz;



