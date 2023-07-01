import { useState } from 'react';
import styled from "styled-components";
import Goal from "./Goal";
import { useNavigate } from 'react-router-dom';

function StudentCard({ student, onDelete, handleUpdate }) {
    const [showGoals, setShowGoals] = useState(false);

    const orderedGoals = [...student.goals.sort((a, b) => a.id - b.id)];
    const navigate = useNavigate();

    return (
        <StudentContainer>
            <StudentGrid onClick={() => setShowGoals(!showGoals)}>
                <Circle>{student.initial}</Circle>
                <p>{student.name}</p>
                <p>Grade: {student.grade_level}</p>
                <i onClick={() => navigate('/students/' + student.id + '/goals/new')} className="material-icons">assignment_add</i>
            </StudentGrid>
            {showGoals 
                ? orderedGoals.map((goal) => <Goal 
                    key={goal.id} 
                    goal={goal} 
                    student={student} 
                    onDelete={onDelete} 
                    handleUpdate={handleUpdate} />) 
                : null
            }
        </StudentContainer>
    );
}

const StudentContainer = styled.div`
    background-color: #d7dace;
    border-radius: 4px;
    width: 80%;
    padding: .25em 1.2em;
    font-size: 1.25em;
    margin: auto;
    margin-top: .5em;
    opacity: .9;
    &:hover {
        opacity: 1;
    }
`

const StudentGrid = styled.div`
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 5%;
    align-items: center;
    cursor: pointer;
`

const Circle = styled.div`
    background-color: #6a8532;
    color: #f8f8f8;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    border-radius: 40px;
    width: 40px;
    height: 40px;
    margin-right: 1em;
`
export default StudentCard;