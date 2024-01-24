import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { I, InputSubmit } from "../styles";
import { submit } from "./fetch";
import ObjectiveCard from "./ObjectiveCard";
import Modal from "./Modal";
import { handleChange } from "./utilities";

function Objectives({ student, goal }) {
    const { id, objectives } = goal;
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const [objectiveForm, setObjectiveForm] = useState({description: `Given ${goal.condition}, ${student.name.split(" ")[0]} will ${goal.behavior} with ${goal.accuracy}% accuracy as measured by ${goal.measurement} by the next annual review.`})
    const [errors, setErrors] = useState();
    const createObjective = useRef(null);

    // Create Objective
    function handleSubmit(e, objectiveForm) {
        e.preventDefault();
        setErrors();

        const callback = (o) => {
            setUser({
                ...user, students: [
                    ...user.students.map((s) => s.id === student.id
                        ? { ...s, goals: [
                            ...s.goals.map((g) => g.id === id
                                ? { ...g, objectives: [...g.objectives, o] }
                                : g
                            )
                        ]} 
                        : s
                    )
                ]
            });
            setStudents([
                ...students.map((s) => s.id === student.id
                    ? { ...s, goals: [
                        ...s.goals.map((g) => g.id === id
                            ? { ...g, objectives: [...g.objectives, o] }
                            : g
                        )
                    ]} 
                    : s
                )
            ]);
            createObjective.current.close();
        }
        submit(`/goals/${id}/objectives`, 'POST', objectiveForm, callback, setErrors);
    } 

    return (
        <>
            <div style={{display: "flex", alignItems: "center", borderBottom: "solid 2px #d7dace", justifyContent: "space-between"}}>
                <div className="flex">
                    <I className="material-icons">task_alt</I>
                    <h4>Objectives</h4>
                </div>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        createObjective.current.showModal();
                    }}
                >
                    <i 
                        style={{padding: '0 4px'}}
                        className="material-icons" 
                        >
                        add_task
                    </i>
                    <p style={{padding: '0 4px 0 0'}}>New Objective</p>
                </Button>
            </div>
            {objectives.length > 0
                ? objectives.map((obj) => <ObjectiveCard key={obj.id} objective={obj} goalID={id} />)
                : null
            }
            <Modal ref={createObjective}>
                <div>
                    <form onSubmit={(e) => handleSubmit(e, objectiveForm)}>
                        <h1>Create Objective</h1>
                        <textarea 
                            name="description" 
                            rows={10}
                            value={objectiveForm.description} 
                            onChange={(e) => handleChange(objectiveForm, setObjectiveForm, e)} 
                            />
                        <InputSubmit type="Submit" value="Submit" />
                        <ul className="errors">
                            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                        </ul>
                    </form>
                </div>
            </Modal>
        </>
    );
}

const Button = styled.button`
    align-items: center;
    background-color: #6a8532;
    border: 2px solid #6a8532;
    border-radius: 4px;
    color: white;
    display: flex;
    // flex-flow: row nowrap;
    // justify-content: space-between;
    padding: 4px;
    opacity: .9;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

export default Objectives;