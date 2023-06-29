import { useState } from 'react';
import styled from "styled-components";
import Search from '../components/Search';
import { FormContainer, InputSubmit } from '../styles/';
import GoalEditor from '../components/GoalEditor';

const newGoal = {
    student_id: "",
    student: "",
    condition: "condition", 
    behavior: "behavior", 
    accuracy: "100", 
    measurement: "measurement"
}

function NewGoal({ students, setStudents, goal=newGoal }) {
    const [search, setSearch] = useState("");
    const [errors, setErrors] = useState([]);
    const [goalForm, setGoalForm] = useState(goal);

    const filtered = [...students].filter(r => r.name.toUpperCase().includes(search.toUpperCase()))
    
    // function handleChange(e) {
    //     setGoalForm({
    //         ...goalForm,
    //         [e.target.name]: e.target.value
    //     });
    // }

    function handleSubmit(e, goalForm) {
        e.preventDefault();
        setErrors([]);
        fetch('/goals', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goalForm)
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((goal) => {
                    const student = [...students].find((student) => student.id === goal.student.id);
            
                    setStudents([
                        ...students.filter((s) => s.id !== student.id),
                        {...student, goals: [...student.goals, goal]}
                    ]);

                    setGoalForm(newGoal);
                });
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <>
            <h1>New Goal</h1>
            <Search search={search} setSearch={setSearch}>
                {search 
                        ? filtered.map((s) => <li 
                        key={s.id} 
                        onClick={(e) => {
                            setGoalForm({
                                ...goalForm, 
                                student_id: s.id,
                                student: s.name
                            });
                            setSearch("")
                        }}
                        >{s.name}</li>) 
                        : null
                    }
            </Search>
            {goalForm.student_id 
                ? <FormContainer>
                    <h3>Goal</h3>
                    <GoalEditor 
                        student={students.find((student) => student.id === goalForm.student_id)}
                        goal={goalForm}
                        onSubmit={handleSubmit}
                        >
                        <InputSubmit type="submit" value="Create Goal" />
                        <ul className="errors">
                            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                        </ul>
                    </GoalEditor>
                </FormContainer>
                : null
            }
        </>
    );
}

const Input = styled.input`
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

export default NewGoal;