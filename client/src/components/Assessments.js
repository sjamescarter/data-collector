import { useState } from "react";
import { handleChange } from "./utilities";
import AssessmentCard from "./AssessmentCard";
import styled from "styled-components";
import Errors from "./Errors";
import useHandleSubmit from "../hooks/useHandleSubmit";

function Assessments({ objective, updateObjectiveState, children }) {
    const { assessments } = objective;
    const [assessmentForm, setAssessmentForm] = useState({note: "", correct: "", total: ""})
    // context

    // Create Assessment
    const callback = (objective) => {
        updateObjectiveState(objective);
        setAssessmentForm({note: "", correct: "", total: ""});
    };
    const { errors, onSubmit } = useHandleSubmit({
        endpoint: `/objectives/${objective.id}/assessments/`,
        method: 'POST',
        form: assessmentForm,
        callback: callback
    });

    return (
        <div>
            <h1>Data</h1>
            <Li>
                <form onSubmit={onSubmit}>
                    <label htmlFor="note">Note: </label>
                    <input type="text" name="note" value={assessmentForm.note} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                    <label htmlFor="correct">Correct Trials: </label>
                    <input type="number" name="correct" value={assessmentForm.correct} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                    <label htmlFor="total">Total Trials: </label>
                    <input type="number" name="total" value={assessmentForm.total} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                    <input type="submit" value="save" />
                    <Errors errors={errors} />
                </form>
            </Li>
            {assessments.map((assessment) => <AssessmentCard key={assessment.id} assessment={assessment} objectiveId={objective.id} />)}
            {children}
        </div>
    );
}

const Li = styled.li`
    background-color: white;
    box-sizing: border-box;
    border: solid 1px #999;
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 0 4px 0 10px;
    margin: 1em 0
`
export default Assessments;