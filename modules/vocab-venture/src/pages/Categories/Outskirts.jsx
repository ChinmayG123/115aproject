

// // import { useLocation } from 'react-router-dom';
// import { useNavigate, useLocation } from 'react-router-dom';

// import React, { useState, useEffect } from 'react';

// import MultChoice from '../../components/combatPopups/MultChoice';
// import Type from '../../components/combatPopups/Type';

// const Outskirts = function() {


//     const navigate = useNavigate(); 


//     const location = useLocation();
//     const username = location.state.username;
//     const selectedlanguage = location.state.language;

//     const [questionType, setQuestionType] = useState('MultChoice'); // Default to 'MultChoice'



//     const goToType = () => {
//         navigate('/type', { state: { username, language: selectedlanguage, questionType } });

//     };


//     const multipleChoice = () => {
//         // navigate('/multiplechoice', { state: { username, language: selectedlanguage } });
//         navigate('/multiplechoice', { state: { username, language: selectedlanguage, questionType } });

//     };


//     return(  
//         <body className = "mapbackground">
//             <h1>Outskirts</h1>

//             <div>
//                 <select value={questionType} onChange={(e) => { setQuestionType(e.target.value); console.log("TARGET", e.target.value); }}>
//                     <option value="MultChoice">Multiple Choice</option>
//                     <option value="Type">Type</option>
//                 </select>
//                 <p>{questionType}</p>
//                 <p>{questionType}</p>
//                 {questionType === 'MultChoice' && <MultChoice questionType={questionType} />}
//                 {questionType === 'Type' && <Type questionType={questionType} />}

//             </div>


//             <button type="button" id="goToTypeButton" onClick={goToType}>
//                 Go to Type
//             </button>

//             <button type="button" id="MultipleChoiceButton" onClick={multipleChoice}>
//                 MultipleChoice
//             </button>


                

//         </body>
 
//      );
// };

// export default Outskirts;




import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MultChoice from '../../components/combatPopups/MultChoice';
import Type from '../../components/combatPopups/Type';

const Outskirts = function() {
    const navigate = useNavigate();
    const location = useLocation();
    const username = location.state.username;
    const selectedlanguage = location.state.language;

    const [questionType, setQuestionType] = useState('MultChoice'); // Default to 'MultChoice'

    const goToType = () => {
        navigate('/type', { state: { username, language: selectedlanguage, questionType } });
    };

    const multipleChoice = () => {
        navigate('/multiplechoice', { state: { username, language: selectedlanguage, questionType } });
    };

    const quiz = () => {
        navigate('/quiz', { state: { username, language: selectedlanguage, questionType } });
    };

    return(  
        <body className="mapbackground">
            <h1>Outskirts</h1>
            {/* <div>
                <select value={questionType} onChange={(e) => setQuestionType(e.target.value)}>
                    <option value="MultChoice">Multiple Choice</option>
                    <option value="Type">Type</option>
                </select>
                <p>{questionType}</p>
                {questionType === 'MultChoice' && <MultChoice questionType="MultChoice" />}
                {questionType === 'Type' && <Type questionType="Type" />}
            </div> */}
            <button type="button" id="goToTypeButton" onClick={goToType}>
                Go to Type
            </button>
            <button type="button" id="MultipleChoiceButton" onClick={multipleChoice}>
                MultipleChoice
            </button>
            <button type="button" id="QuizButton" onClick={quiz}>
                Quiz
            </button>
        </body>
    );
};

export default Outskirts;
