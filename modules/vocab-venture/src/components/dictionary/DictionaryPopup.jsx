import React from 'react';
import './Dictionary.css'; // Import your CSS file for styling
import closeimg from '../../assets/dictionary-assets/CloseTab.png'
import menuimg from '../../assets/dictionary-assets/MenuTab.png'
import nextimg from '../../assets/dictionary-assets/PageFWD.png'
import prvsimg from '../../assets/dictionary-assets/PageBKWD.png'
import pagesimg from '../../assets/dictionary-assets/Pagesfull.png'
import baseimg from '../../assets/dictionary-assets/DictionaryBaseFull.png'
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// import { retrieve_user_data } from '../../../../backend/server/ServerToDatabase.py';




function DictionaryPopup (props) {

  const navigate = useNavigate(); 
  const goToMenu =() => {navigate('/home')};



  // const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //     if (props.trigger && props.username) {
  //         const fetchData = async () => {
  //             const data = await retrieve_user_data(props.username);
  //             setUserData(data);
  //         };
  //         fetchData();
  //     }
  // }, [props.trigger, props.username]);


   
  return (props.trigger) ? (
    <div className= "popup">      

  

        
        <div className= "popup-inner">
          
          <div className= "button-row">
            
            <button className= "button" id= "dictionary-menu-btn" onClick={goToMenu}>
              <img src={menuimg} /></button>
            <button className= "button" id= "dictionary-close-btn" onClick={() => props.setTrigger(false)}>
              <img src={closeimg} /></button>
            
          </div>

          
          {props.children}

          <div className= "popup-pages">

{/*           
          {userData && (
              <div>
                  <h1>Welcome, {props.username}!</h1>
              </div>
          )} */}


          <h1>Welcome, {props.username}!</h1>

          <button className= "button" id= "next-page-btn" onClick={goToMenu}>
            <img src={nextimg} /></button>
          
          <button className= "button" id= "prvs-page-btn" onClick={goToMenu}>
            <img src={prvsimg} /></button>

          </div>
          

        </div>
    </div>
  ) : "";
}
export default DictionaryPopup;