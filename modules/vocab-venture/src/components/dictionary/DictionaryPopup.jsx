// import React from 'react';
// import React, { useEffect } from 'react';
import React, { useEffect, useState } from 'react';

import './Dictionary.css'; // Import your CSS file for styling
import closeimg from '../../assets/dictionary-assets/CloseTab.png'
import menuimg from '../../assets/dictionary-assets/MenuTab.png'
import nextimg from '../../assets/dictionary-assets/PageFWD.png'
import prvsimg from '../../assets/dictionary-assets/PageBKWD.png'
import pagesimg from '../../assets/dictionary-assets/Pagesfull.png'
import baseimg from '../../assets/dictionary-assets/DictionaryBaseFull.png'
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom

// import { retrieve_user_data } from '../../../../backend/server/ServerToDatabase.py';

// import axios from 'axios';

// import pyodide from 'pyodide';

 

const getTheUserInformation = async (username) => {
  try {
      const result = await gameClient.getUserDictionary(username, "Spanish");
      // return { status: 'success' };
      return result;
      // return { status: 'success', result: result };
  } catch (error) {
      return { status: 'error', message: 'An error occurred during login. Please try again.' };
  }
}


// const getTheUserInformation = async (username) => {
//   try {
//       const result = await gameClient.getUserDictionary(username, "Spanish");
//       console.log(result);
//       return { status: 'success', result: result }; // Assuming result.data is an array of items
//   } catch (error) {
//       return { status: 'error', message: 'An error occurred during login. Please try again.' };
//   }
// }


function DictionaryPopup (props) {

  const navigate = useNavigate(); 
  const goToMenu =() => {navigate('/home')};
  // const [userDictionary, setUserDictionary] = useState(null);
  const [userDictionary, setUserDictionary] = useState({ status: 'loading' });



  useEffect(() => {
    const fetchData = async () => {
        const result = await getTheUserInformation(props.username);
        console.log("HELLO");
        console.log(result);
        console.log("BYE");
        setUserDictionary(result);
    }
    fetchData();
}, [props.username]);


  return (props.trigger) ? (
    <div className= "popup">      

  

        
        <div className= "popup-inner">
          
          <div className= "button-row">
            
            <button className= "button" id= "dictionary-menu-btn" onClick={goToMenu}>
              <img src={menuimg} /></button>
            <button className= "button" id= "dictionary-close-btn" onClick={() => props.setTrigger(false)}>
              <img src={closeimg} /></button>
            
          </div>

          
          <div className= "popup-pages">

          

          <h1>Welcome, {props.username}!</h1>

          <button className= "button" id= "next-page-btn" onClick={goToMenu}>
            <img src={nextimg} /></button>
          
          <button className= "button" id= "prvs-page-btn" onClick={goToMenu}>
            <img src={prvsimg} /></button><br></br>


            {userDictionary && userDictionary.result && (
          <ul>
            {userDictionary.result.map(item => (
              <li key={item.id}>
                {item.name}: {item.value}
              </li>
            ))}
          </ul>
        )}

          {/* <p>HIHIIII, {userDictionary.result}</p> */}


          {userDictionary && userDictionary.result && (
  <ul>
    {userDictionary.result.map(item => (
      <li key={item.id}>
        {item.name}: {item.value}
      </li>
    ))}
  </ul>
)}

<p>HIHIIII, {userDictionary.result}</p>




{/* 
          {userDictionary && userDictionary.status === 'success' && userDictionary.result && (
            <ul>
              {userDictionary.result.map(item => (
                <li key={item.id}>{item.name}: {item.value}</li>
              ))}
              <p>BYE, {userDictionary.status}</p>
            </ul>
          )}
          {userDictionary && userDictionary.status === 'error' && (
            <p>An error occurred: {userDictionary.message}</p>
          )}*/}

          {/* <p>HIHIIII, {userDictionary.result}</p>  */}



          </div>

          

        </div>
    </div>
  ) : "";
}
export default DictionaryPopup;