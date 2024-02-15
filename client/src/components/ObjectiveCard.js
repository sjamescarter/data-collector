import { useState } from "react";
import { destroy } from "./fetch";
import styled from "styled-components";
import EditButtons from "./EditButtons";
import Modal from "./Modal";
import Warn from "./Warn";
import Assessments from "./Assessments";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";
import ObjectiveEditor from "./ObjectiveEditor";
import useHandleSubmit from "../hooks/useHandleSubmit";

function ObjectiveCard({ goal, objective, updateObjectiveState, handleUpdate }) {
    const updateGoal = useUpdate(goal, 'objectives');

    // Modals
    const addData = useModal();
    const editObjective = useModal();
    const deleteObjective = useModal();

    // State
    const [objectiveForm, setObjectiveForm] = useState({ ...objective })

    // Update Objective
    const { errors, setErrors, onSubmit } = useHandleSubmit({
        endpoint: `/objectives/${objective.id}`,
        method: 'PATCH',
        form: objectiveForm,
        callback: (updatedObjective) => {
            updateObjectiveState(updatedObjective);
            editObjective.close();
        }
    });

    // Delete Objective
    function handleDelete() {
        const callback = () => {
            const updatedGoal = updateGoal.updateWithout(objective.id);
            handleUpdate(updatedGoal);
            deleteObjective.close();
        }

        destroy(`/objectives/${objective.id}`, callback);
    }

    return (
        <Container>
            <p>{objective.description}</p>
            <Group>
                <Percentage>{objective.result || "No Data"}</Percentage>
                <EditButtons 
                    title="Objective" 
                    addData={addData.open}
                    editAction={editObjective.open} 
                    deleteAction={deleteObjective.open} 
                />
            </Group>
            <Modal title='Objective Data' ref={addData.ref}>
                <Assessments 
                    objective={objective} 
                    updateObjectiveState={updateObjectiveState}
                >
                    <Cancel onClick={addData.close}>Close</Cancel>
                </Assessments>
            </Modal>
            <Modal title='Edit Objective' ref={editObjective.ref}>
                <ObjectiveEditor 
                    onSubmit={onSubmit}
                    form={objectiveForm}
                    setForm={setObjectiveForm}
                    errors={errors}
                    cancel={() => {
                        editObjective.close();
                        setErrors();
                        setObjectiveForm({ ...objective });
                    }}
                />
            </Modal>
            <Modal title='Delete Objective' ref={deleteObjective.ref}>
                <Warn 
                    handleDelete={handleDelete} 
                    closeModal={deleteObjective.close}
                />
            </Modal>
        </Container>
    );
} 

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 10px;
    border: solid 1px #999;
    border-radius: 4px;
    padding: 0 1em;
    margin: 10px 0;
    box-sizing; border-box;
`
const Group = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center; 
    align-items: center; 
    margin: .5em 0 .5em .25em;
    gap: 10px;
`
const Percentage = styled.div`
    background-color: #6a8532;
    display: flex;
    color: #f8f8f8;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    justify-content: center;
    border-radius: 4px;
    padding: .5em;
    box-sizing: border-box;
`
const Cancel = styled.button`
    border: 2px solid #6a8532;
    border-radius: 4px;
    color: #6a8532;
    font-weight: bold;
    font-size: .8em;
    // margin: 20px;
    padding: 10px;
    background-color: #f8f8f8;
    &:hover {
        background-color: #f8f8f8;
        cursor: pointer;
    }
`
export default ObjectiveCard;