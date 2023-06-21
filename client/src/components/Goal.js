import styled from "styled-components";

function Goal({ goal }) {
    return (
        <GoalGrid>
            <p>Given {goal.condition}, student will {goal.behavior} with {goal.accuracy}% accuracy as measured by {goal.measurement} by the next annual review.</p>
            <div></div>
            <i className="material-icons">add_task</i>
            <i className="material-icons">edit</i>
            <i className="material-icons">delete</i>
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