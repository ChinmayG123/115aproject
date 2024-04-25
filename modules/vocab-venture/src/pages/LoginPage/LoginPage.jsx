// import React from 'react';
import './LoginPage.css';
// import React, { useEffect } from 'react'; // Import useEffect from react
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom/dist';

const LoginPage = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};
    // const goToLanguage =() => {navigate('/language');}


    const [loginStatus, setLoginStatus] = useState(null);
    const [errorMsg, setErrorMsg] = useState('');

    

    const goToLanguage = () => {
        const username = document.getElementById('username').value;
        navigate('/language', { state: { username } });
    };

    useEffect(() => {
        const submitLoginElement = document.getElementById('submit-login-id');
        if (submitLoginElement) {
            submitLoginElement.addEventListener('click', () => {
                handleLogin().then((result) => {
                    // Handle the result of the login attempt
                    if (result.status === 'success') {
                        // setLoginStatus('success');
                        goToLanguage();
                    } else {
                        setLoginStatus('failed');
                        setErrorMsg(result.message);
                    }
                }).catch((error) => {
                    console.error('Login error:', error);
                    setErrorMsg('An error occurred during login. Please try again.');
                });
            });
            return () => {
                submitLoginElement.removeEventListener('click', handleLogin);
            };
        }
    }, []);

    // useEffect(() => {
    //     const submitLoginElement = document.getElementById('submit-login-id');
    //     if (submitLoginElement) {
    //         submitLoginElement.addEventListener('click', handleLogin);
    //         return () => {
    //             submitLoginElement.removeEventListener('click', handleLogin);
    //         };
    //     }
    // }, []);
    
    
    // useEffect(() => {
    //     document.getElementById('submit-login-id').addEventListener('click', handleLogin);
    //     return () => {
    //         document.getElementById('submit-login-id').removeEventListener('click', handleLogin);
    //     };
    // }, );
    
    return(  
            <div className='wrapper'>

                <form action ="">
                    <h1>Login</h1>
                    <label>Username</label>
                    <div className= "input-box"> {/*use className= instead of class= for jsx*/}
                        {/* <input type="text" id = "username" placeholder= 'Username' required/> */}
                        <input type="text" id = "username" placeholder='Username' required autoComplete="username" />
                    </div>
                    <label>Password</label>
                    <div className="input-box">
                        {/* <input type= "password" id = "password" placeholder= 'Password' required /> */}
                        <input type="password" id="password" placeholder='Password' required autoComplete="current-password" />

                    </div>

                    {errorMsg && <p className="error-msg">{errorMsg}</p>}<br></br>
                
                    <button type= "button" id= "submit-login-id">Login</button>

                    <p>
                        Don't have an account? <a href="/register">Register</a>
                    </p>
                    <hr/>
                    <button type= "button" id = "submit-mainpage" onClick= {goToMainPage}>Back Home</button>
                    
                </form>
                
                </div>
 
     );
};

export default LoginPage;
