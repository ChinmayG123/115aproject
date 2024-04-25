import React, { useEffect } from 'react'; // Import useEffect from react
import { useNavigate } from 'react-router-dom/dist';
import { useLocation } from 'react-router-dom';


const LanguageSelect = function() {
    const navigate = useNavigate();
    const goToMainPage =() => {navigate('/home')};
    // const goToMap =() => {navigate('/map');}

    const goToMap = () => {
        navigate('/map', { state: { username } });
    };
    


    const location = useLocation();
    const username = location.state.username;

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
        <h1>Welcome, {username}!</h1>
          <form action ="">
          <button type= "button" id= "submit-spanish" onClick = {goToMap}>Spanish</button>
          <button type= "button" id= "submit-french" onClick = {goToMap}>French</button>
          <hr/>
                    <button type= "button" id = "submit-mainpage" onClick= {goToMainPage}>Back Home</button>
          </form>
        </div>
    );

};
export default LanguageSelect;
