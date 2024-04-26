import { useNavigate } from 'react-router-dom/dist';
import npcimg from '../../assets/artist-assets/Artist.png';
import learnBG from '../../assets/artist-assets/Contentbox.png';
import npcTextbox from '../../assets/artist-assets/ArtistTextbox.png';
import easel from '../../assets/artist-assets/Easel.png';
import artistbg from '../../assets/artist-assets/ArtistBG.png';
import './Artist.css';



const Artist = function() {

    const goToMenu =() => {navigate('/home')};

    const navigate = useNavigate(); 
    return(  

        // <div className = "next-button">
        //     <button type= "button" id = "nextbutton" onClick= {goToMenu}>Back Home</button>
        // </div>

        <div className = "container">
            
              
            <img id= "artistbg" src={artistbg}></img>
            <div className = "learn-content">
                <img id= "learnBG" src={learnBG} />
            </div>
            <div className = "npc-content">
                <img id= "npcTextbox" src={npcTextbox} />
                <img id = "npcimg" src={npcimg} />
            </div>
            <img id= "easelimg" src={easel}></img>
            <div className= "textdiv">
                <input type="text" className = "learnInputBox" placeholder='text'/>
            </div>

            {/* <button onClick={goToMenu}>Go to Menu</button> */}
            <button type= "button" id = "nextbutton" onClick= {goToMenu}>Next</button>

                  
        </div>
    
     );
};

export default Artist;



