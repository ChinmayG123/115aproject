// import React, { useEffect } from 'react'; // Import useEffect from react
import React, { useEffect, useState } from 'react'; // Import useEffect and useState from react

// import { useNavigate } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import './LanguageSelect.css'; // Import your CSS file for styling


const LanguageSelect = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};
    // const goToMap =() => {navigate('/map');}




    const location = useLocation();

    const [selectedLanguage, setSelectedLanguage] = useState(null);

    const username = location.state.username;
    // const goToMap = () => {
    //     navigate('/map', { state: { username } });
    // };

    const goToMap = (language) => {
        navigate('/map', { state: { username, language } });
        console.log("language ", language);
    };
    

    // const goToMap = () => {
    //     navigate('/map', { state: { username, language: selectedLanguage } });
    //     console.log("language ", selectedLanguage);
    // };
    

    
    console.log(selectedLanguage);
    



    useEffect(() => {
        const submitLoginElement = document.getElementById('submit-login-id');
        if (submitLoginElement) {
            submitLoginElement.addEventListener('click', handleLogin);
            return () => {
                submitLoginElement.removeEventListener('click', handleLogin);
            };
        }
    }, []);
 
    
    return( 
        <div className='wrapper'>          
            <h1>Welcome,</h1>
            <div className="username-container">
                <h3>{username}</h3> 
            </div>
          <form action ="">
          {/* <button type= "button" id= "submit-spanish" onClick = {goToMap}>Spanish</button>
          <button type= "button" id= "submit-french" onClick = {goToMap}>French</button> */}

            <button type="button" id="submit-spanish" onClick={() => { setSelectedLanguage('spanish'); goToMap('spanish'); }}>Spanish</button>
            <button type="button" id="submit-french" onClick={() => { setSelectedLanguage('french'); goToMap('french'); }}>French</button>

          <hr/>
                    <button type= "button" id = "submit-mainpage" onClick= {goToMainPage}>Back Home</button>
          </form>
        </div>
    );

};
export default LanguageSelect;
