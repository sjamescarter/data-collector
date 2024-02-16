import { useState } from "react";
import EditButtons from "./EditButtons";
import { destroy } from "./fetch";
import Modal from "./Modal";
import Warn from "./Warn";
import styled from "styled-components";
import { handleChange } from "./utilities";
import Errors from "./Errors";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";
import useHandleSubmit from "../hooks/useHandleSubmit";

function AssessmentCard({ objective, assessment, updateObjectiveState }) {
    const updateObjective = useUpdate(objective, 'assessments');

    // Modal
    const warning = useModal();

    // State
    const [isEditing, setIsEditing] = useState(false);
    const [assessmentForm, setAssessmentForm] = useState(assessment);

    // Update Assessment
    const { errors, onSubmit } = useHandleSubmit({
        endpoint: `/objectives/${objective.id}/assessments/${assessment.id}`,
        method: 'PATCH',
        form: assessmentForm,
        callback: (returnedObjective) => {
            updateObjectiveState(returnedObjective);            
            setIsEditing(false);
        }
    });

    // Destroy Assessment
    function handleDelete() {
        const callback = () => {
            const updatedObjective = updateObjective.updateWithout(assessment.id);
            let correct = updatedObjective.assessments.map((a) => a.correct).reduce((total, current) => total + current, 0);
            let total = updatedObjective.assessments.map((a) => a.total).reduce((total, current) => total + current, 0);
            const resultUpdate = Math.floor((correct/total)*100);
            const updatedResult = { ...updatedObjective, result: `${resultUpdate}%` };
            updateObjectiveState(updatedResult);
        }

        destroy(`/assessments/${assessment.id}`, callback);
    }

    return (
        <>
            <Li>
                {isEditing
                    ? <form onSubmit={onSubmit}>
                        <input type="number" name="correct" value={assessmentForm.correct} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                        correct of 
                        <input type="number" name="total" value={assessmentForm.total} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                        trials
                        <input type="submit" value="save" />
                        <Errors errors={errors} />
                    </form>
                    : <div style={{textAlign: "left"}}>
                        <p>{assessment.correct} correct of {assessment.total} trials</p>
                        <small><em>{assessment.note}</em></small>
                    </div>
                }
                <EditButtons title="Assessment" editAction={() => setIsEditing(!isEditing)} deleteAction={warning.open} />
            </Li>
            <Modal title='Delete Data' ref={warning.ref}>
                <Warn handleDelete={handleDelete} closeModal={warning.close}/>
            </Modal>
        </>
    );
}

const Li = styled.li`
    align-items: center;
    list-style: none;
    display: flex;
    justify-content: space-between;
    background-color: #f8f8f8;
    box-sizing: border-box;
    border: solid 1px #999;
    border-radius: 4px;
    padding: 14px 14px 14px 10px;
    margin: .25em 0;
`
export default AssessmentCard;