import { useState } from 'react';
import styled from "styled-components";
import GoalEditor from './GoalEditor';
import ResultsEditor from './ResultsEditor';

function Goal({ goal, student, onDelete, handleUpdate }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editResults, setEditResults] = useState(false)
    const [errors, setErrors] = useState([]);

    function handleSubmit(e, goalForm) {
        e.preventDefault();
        setErrors([]);
        fetch('/goals/' + goal.id, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goalForm)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((goal) => handleUpdate(student.id, goal));
                setIsEditing(false);
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <GoalGrid>
            {isEditing 
                ? <GoalEditor 
                    student={student} 
                    goal={goal} 
                    setIsEditing={setIsEditing} 
                    onSubmit={handleSubmit}
                >
                    <div>
                        <StyledSubmit type="submit" value="Save" />
                        <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                    </div>
                    <ul className="errors">
                        {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                    </ul>
                </GoalEditor>
                : <div>
                    <h5>{goal.owner}'s Goal</h5>
                    <p>Given {goal.condition}, {student.name.split(" ")[0]} will {goal.behavior} with {goal.accuracy}% accuracy as measured by {goal.measurement} by the next annual review.</p>
                </div>
            }
            <div></div>
            <i onClick={() => setEditResults(!editResults)} className="material-icons">addchart</i>
            <i onClick={() => setIsEditing(!isEditing)} className="material-icons">edit</i>
            <i onClick={() => onDelete(goal.id, student.id)} className="material-icons">delete</i>
            {editResults 
                ? <ResultsEditor student={student} goal={goal} setEditResults={setEditResults} handleUpdate={handleUpdate} /> 
                : goal.result 
                ? <p><b>Student results: {goal.result}</b></p> 
                : null
            }
        </GoalGrid>
    );
}

const GoalGrid = styled.div`
    background-color: #f8f8f8;
    border-radius: 4px;
    display: grid;
    grid-template-columns: 80% 5% 5% 5% 5%;
    align-items: center;
    padding: 0 15px;
    margin-top: 1em;
    margin-bottom: 1em;
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
export default Goal;