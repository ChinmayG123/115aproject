// import React from 'react';
import './LoginPage.css';
import React, { useEffect } from 'react'; // Import useEffect from react
import { useNavigate } from 'react-router-dom/dist';

const LoginPage = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};

    
    useEffect(() => {
        document.getElementById('submit-login-id').addEventListener('click', handleLogin);
        return () => {
            document.getElementById('submit-login-id').removeEventListener('click', handleLogin);
        };
    }, );
    
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
