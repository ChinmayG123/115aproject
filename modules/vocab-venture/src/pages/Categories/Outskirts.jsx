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
    const [difficulty, setDifficulty] = useState('easy'); // Default difficulty level

    const goToType = () => {
        navigate('/type', { state: { username, language: selectedlanguage, questionType, difficulty } });
    };

    const multipleChoice = () => {
        navigate('/multiplechoice', { state: { username, language: selectedlanguage, questionType, difficulty } });
    };

    const match = () => {
        navigate('/match', { state: { username, language: selectedlanguage, questionType, difficulty } });
    };

    const quiz = () => {
        navigate('/quiz', { state: { username, language: selectedlanguage, questionType } });
    };

    return(  
        <body className="mapbackground">
            <h1>Outskirts</h1>

            <div>
                <h1>Select Difficulty:</h1>
                <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
            </div>
            <button type="button" id="goToTypeButton" onClick={goToType}>
                Go to Type
            </button>
            <button type="button" id="MultipleChoiceButton" onClick={multipleChoice}>
                MultipleChoice
            </button>
            <button type="button" id="MatchButton" onClick={match}>
                Match
            </button>
            <button type="button" id="QuizButton" onClick={quiz}>
                Quiz
            </button>
        </body>
    );
};

export default Outskirts;
