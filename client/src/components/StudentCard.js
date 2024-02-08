import { useNavigate } from 'react-router-dom';
import styled from "styled-components";
import EditButtons from "./EditButtons";

function StudentCard({ student }) {
    const navigate = useNavigate(); 

    return (
        <StudentContainer>
            <Card onClick={() => navigate(`/students/${student.id}`)}>
                <Circle>{student.initial}</Circle>
                <Info>
                    <Name>{student.name}</Name>
                    <Grade>Grade: {student.grade_level}</Grade>
                </Info>
                <EditButtons />
            </Card>
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
const Card = styled.div`
    display: flex;
    flex-flow: row nowrap;
    justify-content: space-between;
    align-items: center;
    cursor: pointer;
    height: 3.5em;
`
const Info = styled.div`
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    width: 60%;
    @media (max-width: 768px) {
        flex-direction: column;
    }
`
const Name = styled.p`
    margin: 0;
    padding: 0;
`
const Grade = styled(Name)`
    font-size: 1em;
    @media (max-width: 768px) {
        font-size: .8em;
    }
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