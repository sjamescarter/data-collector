import { useContext, useState } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { I, InputSubmit } from "../styles";
import ObjectiveCard from "./ObjectiveCard";
import Modal from "./Modal";
import { handleChange } from "./utilities";
import Errors from "./Errors";
import useHandleSubmit from "../hooks/useHandleSubmit";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";

function Objectives({ student, goal }) {
    const { id, objectives } = goal;
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const [objectiveForm, setObjectiveForm] = useState({description: `Given ${goal.condition}, ${student.name.split(" ")[1]} will ${goal.behavior} with ${goal.accuracy}% accuracy.`})
    
    // Modal
    const createObjective = useModal();
    
    const updateGoal = useUpdate(goal, 'objectives');
    const updateStudent = useUpdate(student, 'goals');
    const updateUser = useUpdate(user, 'students');

    // Create Objective
    const updateObjectiveState = (newObjective) => {
        const updatedGoal = updateGoal.updateWith(newObjective);
        const updatedStudent = updateStudent.updateWith(updatedGoal);
        setUser(updateUser.updateWith(updatedStudent));
        setStudents([...students.map((s) => s.id === student.id ? updatedStudent : s)]);
        createObjective.current.close();
    } 
    const { errors, onSubmit } = useHandleSubmit({
        endpoint: `/goals/${id}/objectives`,
        method: 'POST',
        form: objectiveForm,
        callback: updateObjectiveState
    });

    return (
        <>
            <div style={{display: "flex", alignItems: "center", borderBottom: "solid 2px #d7dace", justifyContent: "space-between"}}>
                <div className="flex">
                    <I className="material-icons">task_alt</I>
                    <h4>Objectives</h4>
                </div>
                <Button 
                    onClick={createObjective.open}
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
                ? objectives.map((obj) => <ObjectiveCard key={obj.id} objective={obj} goalID={id} updateObjectiveState={updateObjectiveState} />)
                : null
            }
            <Modal ref={createObjective.ref}>
                <form onSubmit={onSubmit}>
                    <h1>Create Objective</h1>
                    <textarea 
                        name="description" 
                        rows={10}
                        value={objectiveForm.description} 
                        onChange={(e) => handleChange(objectiveForm, setObjectiveForm, e)} 
                        />
                    <InputSubmit type="Submit" value="Submit" />
                    <Errors errors={errors} />
                </form>
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