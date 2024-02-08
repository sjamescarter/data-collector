import { useState } from "react";
import styled from "styled-components";
import { I, InputSubmit } from "../styles";
import ObjectiveCard from "./ObjectiveCard";
import Modal from "./Modal";
import { handleChange } from "./utilities";
import Errors from "./Errors";
import useHandleSubmit from "../hooks/useHandleSubmit";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";
import ObjectiveEditor from "./ObjectiveEditor";

function Objectives({ student, goal, handleUpdate }) {
    const { id, objectives } = goal;
    const [objectiveForm, setObjectiveForm] = useState({description: `Given ${goal.condition}, ${student.name.split(" ")[1]} will ${goal.behavior} with ${goal.accuracy}% accuracy.`})
    
    // Modal
    const createObjective = useModal();
    
    const updateGoal = useUpdate(goal, 'objectives');

    // Create Objective
    const updateObjectiveState = (newObjective) => {
        const updatedGoal = updateGoal.updateWith(newObjective);
        handleUpdate(updatedGoal);
    } 

    const { errors, setErrors, onSubmit } = useHandleSubmit({
        endpoint: `/goals/${id}/objectives`,
        method: 'POST',
        form: objectiveForm,
        callback: (newObjective) => { 
            updateObjectiveState(newObjective); 
            createObjective.close(); 
        }
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
                ? objectives.map((o) => 
                    <ObjectiveCard 
                        key={o.id} 
                        goal={goal}
                        objective={o} 
                        updateObjectiveState={updateObjectiveState}
                        handleUpdate={handleUpdate} 
                    />
                )
                : null
            }
            <Modal title='Create Objective' ref={createObjective.ref}>
                <ObjectiveEditor 
                    onSubmit={onSubmit}
                    errors={errors}
                    form={objectiveForm}
                    setForm={setObjectiveForm}
                    cancel={() => {
                        createObjective.close();
                        setErrors();
                        setObjectiveForm({description: `Given ${goal.condition}, ${student.name.split(" ")[1]} will ${goal.behavior} with ${goal.accuracy}% accuracy.`});
                    }}
                />
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