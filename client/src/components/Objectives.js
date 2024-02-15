import { useState } from "react";
import { I } from "../styles";
import ObjectiveCard from "./ObjectiveCard";
import Modal from "./Modal";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";
import ObjectiveEditor from "./ObjectiveEditor";
import useHandleSubmit from "../hooks/useHandleSubmit";
import IconButton from "./IconButton";

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
                <IconButton 
                    onClick={createObjective.open}
                    icon='add_task'
                    text='New Objective'
                />
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

export default Objectives;