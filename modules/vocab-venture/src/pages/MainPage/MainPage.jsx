//a front page with info about the program
//prompts user to login or register

import React from 'react';
import { useNavigate } from 'react-router-dom/dist';
import './MainPage.css';
//NOTE: must change .png to in filename or will cause error
import logo from '../../assets/MainPageCatLined.png';

//let the register and login buttons go to different pages

const MainPage = function() {
    const navigate = useNavigate();
    const goToLoginPage =() => {navigate('/login')};
    const goToRegisterPage =() => {navigate('/register')};

    return(  
            <div className='wrapper'>
                <h1>Vocab Venture</h1>
                <p>Learn words from different languages</p>
                <img src= {logo} id= "main-page-cat" className= "center"/>
                {/* idk how to put MainPageCat.png from assets to right here */}
                    <div id="front-container">
                        <hr/>
                        <h3>Get Started</h3>
                            <button id="login-button" onClick= {goToLoginPage}>Login</button>
                            <p>or</p>
                            <button id="register-button" onClick= {goToRegisterPage}>Register</button>
                    </div>  
            </div>
 
     );
};

export default MainPage;