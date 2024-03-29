import styled from "styled-components";
import { I } from "../styles/index"
import { useNavigate } from 'react-router-dom';

// Student calls GoalCard
function GoalCard({ goal }) {
    const { id, subject, summary } = goal;
    const navigate = useNavigate();

    return (
        <Container onClick={() => navigate(`goals/${id}`)}>
            <GoalHeader>
                <div className='flex'>
                    <I className="material-icons">assignment</I>
                    <h3>{subject} Goal</h3>
                </div>
            </GoalHeader>
            <p>{summary}</p>
        </Container>
    );
}

const Container = styled.div`
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px 15px;
    margin-top: 1em;
    margin-bottom: 1em;
    &:hover {
        box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
        cursor: pointer;
    }
`
const GoalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 2px #d7dace;
`
export default GoalCard;