import React, { useEffect } from 'react'; // Import useEffect from react
import { useNavigate } from 'react-router-dom/dist';
import background from '../../assets/MenuBG.png';

import './MapPage.css';

// export default function Map() {
// return(
//     <p>hi</p>
// );
// };



const Map = function() {

    return(  
        <body className = "mapbackground">
            {/* <div className='mapbg'> */}
                <h1>Vocab Venture</h1>
                {/* <img src= {background} id= "backgroundpic" className= "center"/> */}
            {/* </div> */}
        </body>
 
     );
};

export default Map;