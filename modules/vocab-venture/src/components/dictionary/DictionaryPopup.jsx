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


const getTheUserInformation = async (username, language) => {
  try {
      const result = await gameClient.getUserDictionary(username, language);
      // return { status: 'success' };
      return result;
      // return { status: 'success', result: result };
  } catch (error) {
      return { status: 'error', message: 'An error occurred during login. Please try again.' };
  }
}

function DictionaryPopup (props) {

  const { selectedLanguage } = props;


  const navigate = useNavigate(); 
  const goToMenu =() => {navigate('/home')};
  const [userDictionary, setUserDictionary] = useState(null);

  const [currentPage, setCurrentPage] = useState(0);




// const handleNextPage = () => {
//   setCurrentPage(current => Math.min(current + 1, Object.keys(userDictionary).length - 1));
//   console.log("Current Page:", currentPage); // Print current page to console
// };
// const handleNextPage = () => {
//   if (currentPage < Math.floor((Object.keys(userDictionary).length) / 2)) {
//     setCurrentPage(current => Math.min(current + 1, (Object.keys(userDictionary).length)));
//     console.log("Current Page:", currentPage); // Print current page to console
//   } else {
//     console.log("Cannot go to next page. Limit reached.");
//   }
// };


const handleNextPage = () => {
  if (currentPage < Math.floor((Object.keys(userDictionary).length - 1) / 2)) {
    setCurrentPage(current => {
      const nextPage = current + 1;
      console.log("Current Page:", nextPage); // Log the updated current page
      return nextPage;
    });
  } else {
    console.log("Cannot go to next page. Limit reached.");
  }
};




const handlePreviousPage = () => {
  setCurrentPage(current => Math.max(current - 1, 0));
};

  useEffect(() => {
    const fetchData = async () => {
        
        const result = await getTheUserInformation(props.username, selectedLanguage);
        console.log("HELLO");
        console.log(result);
        console.log("BYE");
        setUserDictionary(result);
        setCurrentPage(0); 

    }
    fetchData();
}, [props.username, selectedLanguage]);


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

                <div className = "welcome-user">
                    <h2>Welcome, {props.username}!</h2>
                    <p>Dictionary Length: {Object.keys(userDictionary).length}</p>
                </div>

                <br></br>
                <div className = "learned-words">
                  {userDictionary &&
                    Object.entries(userDictionary).map(([key, value], index) => {
                      if (index >= currentPage * 2 && index < (currentPage + 1) * 2) {
                        return (
                          <div key={key} className="word-container">
                            <p>{key}: {value}</p>
                          </div>
                        );
                      }
                      return null;
                    })}
                </div>


                <button className="button" id="next-page-btn" onClick={handleNextPage} 
                  disabled={currentPage >= Math.floor((Object.keys(userDictionary).length - 1) / 2)}>
                  <img src={nextimg} />
                </button>

                <button className="button" id="prvs-page-btn" onClick={handlePreviousPage}>
                  <img src={prvsimg} />
                </button><br />
          </div>
        </div>
    </div>
  ) : "";
}
export default DictionaryPopup;