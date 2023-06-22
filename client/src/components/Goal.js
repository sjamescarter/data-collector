import { useState } from 'react';
import styled from "styled-components";
import GoalEditor from './GoalEditor';

function Goal({ goal, student, onDelete, handleUpdate }) {
    const [isEditing, setIsEditing] = useState(false)

    return (
        <GoalGrid>
            {isEditing 
                ? <GoalEditor student={student} goal={goal} setIsEditing={setIsEditing} handleUpdate={handleUpdate} />
                : <p>Given {goal.condition}, {student.name.split(" ")[0]} will {goal.behavior} with {goal.accuracy}% accuracy as measured by {goal.measurement} by the next annual review.</p>
            }
            <div></div>
            <i className="material-icons">addchart</i>
            <i onClick={() => setIsEditing(!isEditing)} className="material-icons">edit</i>
            <i onClick={() => onDelete(goal.id, student.id)} className="material-icons">delete</i>
            {goal.result ? <p>Student results: {goal.result}</p> : null}
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
    margin-bottom: 1em;
`

export default Goal;