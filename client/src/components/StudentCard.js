import styled from "styled-components";
import { useNavigate } from 'react-router-dom';
import { I } from '../styles';

function StudentCard({ student }) {
    const navigate = useNavigate();

    function handleClick(e) {
        e.stopPropagation(); 
        navigate(`/students/${student.id}/goals/new`);
    }

    return (
        <StudentContainer>
            <StudentGrid onClick={() => navigate(`/students/${student.id}`)}>
                <Circle>{student.initial}</Circle>
                <p>{student.name}</p>
                <p>Grade: {student.grade_level}</p>
                <I 
                    className="material-icons"
                    onClick={handleClick} 
                    title="Add Goal"
                >
                    assignment_add
                </I>
            </StudentGrid>
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