import { useState } from 'react'
import styled from 'styled-components';
import { handleChange } from './utilities';

function GoalEditor({ children, student, goal, onSubmit }) {
    const [goalForm, setGoalForm] = useState(goal);

    function calcWidth(target) {
        return (target.length > 13 ? target.length : 13);
    }

    return (
        <form onSubmit={(e) => onSubmit(e, goalForm)}>
            Given 
            <InputField 
                type="text" 
                name="condition" 
                placeholder="condition"
                style={{width: `${calcWidth(goalForm.condition)}ch`}}
                value={goalForm.condition} 
                onChange={(e) => handleChange(goalForm, setGoalForm, e)} 
            />,
            {` ${student.name.split(" ")[0]} `} 
            will
            <InputField 
                type="text" 
                name="behavior" 
                placeholder="behavior"
                style={{width: `${calcWidth(goalForm.behavior)}ch`}}
                value={goalForm.behavior} 
                onChange={(e) => handleChange(goalForm, setGoalForm, e)} 
            />
            with
            <InputField 
                type="number" 
                name="accuracy" 
                placeholder="0"
                style={{width: "6ch"}} 
                value={goalForm.accuracy} 
                onChange={(e) => handleChange(goalForm, setGoalForm, e)} 
            />
            % accuracy as measured by 
            <InputField 
                type="text" 
                name="measurement" 
                placeholder="measurement"
                style={{width: `${calcWidth(goalForm.measurement)}ch`}}
                value={goalForm.measurement} 
                onChange={(e) => handleChange(goalForm, setGoalForm, e)} 
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
    box-sizing: border-box;
    font-family: 'Ubuntu';
    font-size: 1em;
    padding: 5px;
    margin: 5px 5px;
    text-align: center;
    &:focus {
        outline-color: #6a8532;
    }
`

export default GoalEditor;