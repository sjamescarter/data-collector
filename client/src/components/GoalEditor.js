import { useState } from 'react'
import styled from 'styled-components';

function GoalEditor({ children, student, goal, onSubmit }) {
    const [goalForm, setGoalForm] = useState(goal);

    function handleChange(e) {
        setGoalForm({
            ...goalForm,
            [e.target.name]: e.target.value
        });
    }

    return (
        <form onSubmit={(e) => onSubmit(e, goalForm)}>
            Given 
            <InputField 
                type="text" 
                name="condition" 
                placeholder="condition"
                style={{width: goalForm.condition.length + 2 + "ch"}} 
                value={goalForm.condition} 
                onChange={handleChange} 
            />,
            {" " + student.name.split(" ")[0] + " "} 
            will
            <InputField 
                type="text" 
                name="behavior" 
                placeholder="behavior"
                style={{width: goalForm.behavior.length + 2 + "ch"}} 
                value={goalForm.behavior} 
                onChange={handleChange} 
            />
            with
            <InputField 
                type="number" 
                name="accuracy" 
                placeholder="100"
                style={{width: "6ch"}} 
                value={goalForm.accuracy} 
                onChange={handleChange} 
            />
            % accuracy as measured by 
            <InputField 
                type="text" 
                name="measurement" 
                placeholder="measurement"
                style={{width: goalForm.measurement.length + 2 + "ch"}} 
                value={goalForm.measurement} 
                onChange={handleChange} 
            />
            by the next annual review.
            {children}
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
    &:focus {
        outline-color: #6a8532;
    }
`

export default GoalEditor;