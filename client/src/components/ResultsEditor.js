import { useState } from 'react'
import styled from 'styled-components';
import { handleChange } from './utilities';

function ResultsEditor({ student, goal, setEditResults, handleUpdate }) {
    const [goalForm, setGoalForm] = useState({goal, correct: "", total: ""});
    const [errors, setErrors] = useState([]);

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        fetch(`/goals/${goal.id}/assignments`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correct: goalForm.correct,
                total: goalForm.total
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((goal) => handleUpdate(student.id, goal));
                setEditResults(false);
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="correct">Correct Trials:</label>  
            <InputField 
                id="correct"
                name="correct" 
                type="number" 
                value={goalForm.correct} 
                onChange={(e) => handleChange(goalForm, setGoalForm, e)} 
            />
            <label htmlFor="total">Total Trials:</label>  
            <InputField 
                id="total" 
                name="total"
                type="number" 
                value={goalForm.total} 
                onChange={(e) => handleChange(goalForm, setGoalForm, e)} 
            />
            <div>
            <StyledSubmit type="submit" value="Save" />
            <Button onClick={() => setEditResults(false)}>Cancel</Button>
            </div>
            <ul className="errors">
                {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
            </ul>
        </form>
    );
}

const InputField = styled.input`
    background-color: #f8f8f8;
    border: none;
    border-bottom: 1px solid #999;
    text-align: center;
    padding: 5px;
    margin: 5px 5px;
    font-family: 'Ubuntu';
    box-sizing: border-box;
    font-size: 1em;
    width: 6ch;
    &:focus {
        outline-color: #6a8532;
    }
`
const StyledSubmit = styled.input`
    background-color: #6a8532;
    color: white;
    border: 1.5px solid #6a8532; 
    border-radius: 8px;
    font-weight: bold;
    font-size: .8em;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
`

const Button = styled.button`
    background-color: #f8f8f8;
    color: #6a8532;
    border: 1.5px solid #6a8532; 
    border-radius: 8px;
    font-weight: bold;
    font-size: .8em;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
`

export default ResultsEditor;