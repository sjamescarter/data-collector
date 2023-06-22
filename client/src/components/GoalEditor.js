import { useState } from 'react'
import styled from 'styled-components';

function GoalEditor({ student, goal, setIsEditing, handleUpdate }) {
    const [goalForm, setGoalForm] = useState(goal);
    const [errors, setErrors] = useState([]);

    function handleChange(e) {
        setGoalForm({
            ...goalForm,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
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
        <form onSubmit={handleSubmit}>
            Given 
            <InputField type="text" name="condition" style={{width: goalForm.condition.length + "ch"}} value={goalForm.condition} onChange={handleChange} />,
            {" " + student.name.split(" ")[0] + " "} 
            will
            <InputField type="text" name="behavior" style={{width: goalForm.behavior.length + "ch"}} value={goalForm.behavior} onChange={handleChange} />
            with
            <InputField type="number" name="accuracy" style={{width: "5ch"}} value={goalForm.accuracy} onChange={handleChange} />
            % accuracy as measured by 
            <InputField type="text" name="measurement" style={{width: goalForm.measurement.length + "ch"}} value={goalForm.measurement} onChange={handleChange} />
            by the next annual review.
            <div>
            <StyledSubmit type="submit" value="Save" />
            <Button onClick={() => setIsEditing(false)}>Cancel</Button>
            </div>
            <ul className="errors">
                {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
            </ul>
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

export default GoalEditor;