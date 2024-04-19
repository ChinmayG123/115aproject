import React, { useEffect } from 'react'; // Import useEffect from react
import { useNavigate } from 'react-router-dom/dist';

const LoginPage = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};
    const goToMap =() => {navigate('/map');}

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
          <form action ="">
          <button type= "button" id= "submit-spanish" onClick = {goToMap}>Spanish</button>
          <button type= "button" id= "submit-french">French</button>
          <hr/>
                    <button type= "button" id = "submit-mainpage" onClick= {goToMainPage}>Back Home</button>
          </form>
        </div>
    );

};
export default LoginPage;
