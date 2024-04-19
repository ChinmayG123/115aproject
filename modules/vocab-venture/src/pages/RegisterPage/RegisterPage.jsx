// import React from 'react';
import React, { useEffect } from 'react'; // Import useEffect from react
import { useNavigate } from 'react-router-dom/dist';

const RegisterPage = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};
    


    useEffect(() => {
        const submitRegisterElement = document.getElementById('submit-register-id');
        if (submitRegisterElement) {
            submitRegisterElement.addEventListener('click', handleRegister);
            return () => {
                submitRegisterElement.removeEventListener('click', handleRegister);
            };
        }
    }, []);

    

    // useEffect(() => {
    //     document.getElementById('submit-register-id').addEventListener('click', handleRegister);
    //     return () => {
    //         document.getElementById('submit-register-id').removeEventListener('click', handleRegister);
    //     };
    // }, []);
    

    return(  
        
            <div className='wrapper'>
                <form action ="">
                    <h1>Register</h1>

                    <label>Username</label>
                    <div className= "input-box"> {/*use className= instead of class= for jsx*/}
                    <input type="text" id = "new-username" placeholder= 'Username' required/>
                    </div>

                    <label>Password</label>
                    <div className="input-box">
                        <input type= "password" id = "new-password" placeholder= 'Password' required />
                    </div>
                    <button type= "button" id = "submit-register-id">Register</button>
                    <p>
                        Already have an account? <a href="/login">Login</a>
                    </p>
                    <hr/>

                    <button type= "button" id = "submit-mainpage" onClick= {goToMainPage}>Back Home</button>
                </form>
            </div>
 
     );
};

export default RegisterPage;