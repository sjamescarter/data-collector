import { useState } from "react";
import EditButtons from "./EditButtons";
import { destroy } from "./fetch";
import Modal from "./Modal";
import Warn from "./Warn";
import styled from "styled-components";
import { handleChange } from "./utilities";
import Errors from "./Errors";
import useHandleSubmit from "../hooks/useHandleSubmit";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";

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
            updateObjectiveState(updatedObjective);
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
                    : <div>{assessment.correct} correct of {assessment.total} trials</div>
                }
                <EditButtons title="Assessment" editAction={() => setIsEditing(!isEditing)} deleteAction={warning.open} />
            </Li>
            <Modal ref={warning.ref}>
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