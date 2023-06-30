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
// const StyledSubmit = styled.input`
//     background-color: #6a8532;
//     color: white;
//     border: 1.5px solid #6a8532; 
//     border-radius: 8px;
//     font-weight: bold;
//     font-size: .8em;
//     padding: 5px 10px;
//     margin: 5px;
//     cursor: pointer;
// `

// const Button = styled.button`
//     background-color: #f8f8f8;
//     color: #6a8532;
//     border: 1.5px solid #6a8532; 
//     border-radius: 8px;
//     font-weight: bold;
//     font-size: .8em;
//     padding: 5px 10px;
//     margin: 5px;
//     cursor: pointer;
// `

export default GoalEditor;