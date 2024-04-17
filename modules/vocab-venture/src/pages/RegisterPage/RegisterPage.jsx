import React from 'react';
import { useNavigate } from 'react-router-dom/dist';

const RegisterPage = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};
    
    return(  
        
            <div className='wrapper'>
                <form action ="">
                    <h1>Register</h1>
                    
                    <div className= "input-box"> {/*use className= instead of class= for jsx*/}
                        <input type="text" placeholder= 'Username' required/>
                    </div>
                    <div className="input-box">
                        <input type= "password" placeholder= 'Password' required />
                    </div>
                    <button type= "submit">Register</button>
                    <p>
                        Already have an account? <a href="/register">Register</a>
                    </p>
                    <button type= "submit" onClick= {goToMainPage}>Back Home</button>
                </form>
            </div>
 
     );
};

export default RegisterPage;