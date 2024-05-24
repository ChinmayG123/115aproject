// import { useNavigate } from 'react-router-dom/dist';
// import { useNavigate } from 'react-router-dom';


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

import shirt from '../../assets/dict-images/clothing/shirt.png';
import hat from '../../assets/dict-images/clothing/hat.png';
import skirt from '../../assets/dict-images/clothing/skirt.png';
import jacket from '../../assets/dict-images/clothing/jacket.png';
import socks from '../../assets/dict-images/clothing/socks.png';
import shoes from '../../assets/dict-images/clothing/shoes.png';
import gloves from '../../assets/dict-images/clothing/gloves.png';
import pants from '../../assets/dict-images/clothing/pants.png';

import desk from '../../assets/dict-images/school/desk.png'
import paper from '../../assets/dict-images/school/paper.png'
import pencil from '../../assets/dict-images/school/pencil.png'
import pen from '../../assets/dict-images/school/pen.png'
import student from '../../assets/dict-images/school/student.png'
import teacher from '../../assets/dict-images/school/teacher.png'
import classroom from '../../assets/dict-images/school/classroom.png'
import book from '../../assets/dict-images/school/book.png'


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
      case 'shirt':
            return shirt;
      case 'pants':
            return pants;
      case 'socks':
            return socks;
      case 'jacket':
            return jacket;
      case 'shoes':
            return shoes;
      case 'hat':
            return hat;
      case 'gloves':
            return gloves;
      case 'skirt':
            return skirt;
      case 'desk':
        return desk;
      case 'pencil':
        return pencil;
      case 'pen':
        return pen;
      case 'classroom':
        return classroom;
      case 'teacher':
        return teacher;
      case 'student':
        return student;
      case 'paper':
        return paper;
      case 'book':
        return book;
      default:
          return null;
  }
};


// import { useLocation } from 'react-router-dom';
import { useNavigate, useLocation } from 'react-router-dom';

import React, { useState, useEffect } from 'react';
// import React, { useState } from 'react';





const Type = function(props) {

//   const { selectedLanguage } = props;
// console.log("TYPE");


    const navigate = useNavigate(); 

    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;
  
    const goToMap = () => {
        navigate('/map', { state: { username, language: selectedlanguage } });
    };

  
    const [currentWordIndex, setCurrentWordIndex] = useState(0);




  const [correctMessage, setCorrectMessage] = useState(""); // Define the state for displaying the message

    const [textInput, setTextInput] = useState(""); 



     
    // const [englishword, setEnglishWord] = useState('');


    
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        setTextInput(newValue); // Update the text input value as the user types
        // console.log(newValue);
    };



    const handleKeyPress = (e) =>{
        if(e.key === 'Enter'){
            handleEnterClick(props.wordToShow);
        }
    }

    const handleEnterClick = async (key) => {
        

        console.log("inputted text", textInput);

        const translation = await gameClient.getTranslation(username, selectedlanguage, key);
       

      

        if (textInput.toLowerCase() === translation.toLowerCase()) {
           
            setCorrectMessage("Correct!");
            setTimeout(() => {
                // showNextWord();
                setCorrectMessage("");
                gameClient.upProficiency(username, selectedlanguage, key); // Call downProficiency()
                props.setIsAttacking(true);
                props.setIsAnswerCorrect(true);
                props.setIsQuestionDone(true);
            }, 2000);
            
        } else {
            props.setIsHit(true);
            //console.log("Incorrect word!");
            props.setIsAnswerCorrect(false);

            setCorrectMessage("Incorrect word!");
            console.log("WRONG INPUT");

            setTimeout(() => {

                gameClient.downProficiency(username, selectedlanguage, key); // Call downProficiency()
                props.setIsQuestionDone(true);
                setCorrectMessage("");

            }, 3000);


            
            // await gameClient.downProficiency(username, selectedlanguage, key);
        }
    
        setTextInput(""); // Clear the text input after checking
    };


/*

    useEffect(() => {
    
        const interval = setInterval(() => {
            props.setTimer((prevTimer) => {
                if (prevTimer > 0 && !correctMessage) {
                    return prevTimer - 1;
                } 
                else if (prevTimer > 0 && correctMessage) {
                    return prevTimer;
                } else {
                    // Timer expired
                    clearInterval(interval); // Stop the interval
                    setTimeout(() => {
                        showNextWord(); // Move to the next word after 2 seconds
                        gameClient.downProficiency(username, selectedlanguage, englishword); // Call downProficiency()
                        props.setTimer(10); // Reset timer to initial value
                    }, 2000);
                    return 0; // Set timer to 0 to display "Time is up!"
                }
            });
            
        }, 1000); // Update timer every second
    
        // Clean up interval on component unmount
        return () => clearInterval(interval);
    }, [currentWordIndex, showNextWord, username, selectedlanguage, englishword]); // Re-run effect when necessary dependencies change
*/

    

    return(props.trigger) ?(  

        <div className = "type-container">
            

            <div className="textdiv">
                <input
                    type="text"
                    className="learnInputBox"
                    placeholder="text"
                    value={textInput}
                    onChange={handleInputChange}
                    onKeyPress={handleKeyPress}
                    autoFocus
                />
            </div>

{/* 
            <button type="button"  id="enterbutton" onClick={() => handleEnterClick(englishword)}>
                Enter
            </button> */}


                
            {correctMessage && (
                <div className="message-display">
                    <p>{correctMessage}</p>
                </div>
            )}


            <div className = "typeCONTENT" >
                
           
                          
                          <div className="type-word-container">
                           
                            
                              <div className="type-image-container">
                                {getWordImageSrc(props.wordToShow) && (
                                  <img
                                    id="type-image"
                                    src={getWordImageSrc(props.wordToShow)}
                                    alt={props.wordToShow}
                                  />
                                )}
                              </div>

                              <div className="type-word-info">
                                <h1 >English: {props.wordToShow}</h1>
                                </div>

                            
                        </div>
                        
              </div>

                

            
            <button type="button"  id="enterbutton" onClick={() => handleEnterClick(props.wordToShow)}>
                Enter
            </button>


            <button type="button" id="goToMapButton" onClick={goToMap}> Go to Map</button>
            
                
        </div>
    
     ):"";
};

export default Type;