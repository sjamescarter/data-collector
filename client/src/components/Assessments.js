import { useState } from "react";
import { handleChange } from "./utilities";
import AssessmentCard from "./AssessmentCard";
import styled from "styled-components";
import Errors from "./Errors";
import useHandleSubmit from "../hooks/useHandleSubmit";
import { InputField, InputSubmit } from "../styles";

const newAssessment = {note: "", correct: "", total: ""}

function Assessments({ objective, updateObjectiveState, children }) {
    const { assessments } = objective;
    const [assessmentForm, setAssessmentForm] = useState(newAssessment);
    const onChange = (e) => handleChange(assessmentForm, setAssessmentForm, e);

    // Create Assessment
    const { errors, onSubmit } = useHandleSubmit({
        endpoint: `/objectives/${objective.id}/assessments/`,
        method: 'POST',
        form: assessmentForm,
        callback: (objective) => {
            updateObjectiveState(objective);
            setAssessmentForm(newAssessment);
        }
    });

    return (
        <div>
            <Li>
                <form onSubmit={onSubmit}>
                    <label>NOTE
                        <TextArea rows="2" name="note" value={assessmentForm.note} onChange={onChange} />
                    </label>
                    <div className="flex" style={{gap: '1em'}}>
                        <label>CORRECT TRIALS 
                            <InputField type="number" name="correct" value={assessmentForm.correct} onChange={onChange} />
                        </label>
                        /
                        <label>TOTAL TRIALS 
                            <InputField type="number" name="total" value={assessmentForm.total} onChange={onChange} />
                        </label>
                    </div>
                    <InputSubmit type="submit" value="Create Data" />
                    <Errors errors={errors} />
                </form>
            </Li>
            <div style={{margin: '1em 0'}}>
                {assessments.map((a) => 
                    <AssessmentCard
                        key={a.id} 
                        assessment={a} 
                        objective={objective}
                        updateObjectiveState={updateObjectiveState} 
                    />
                )}
            </div>
            {children}
        </div>
    );
}

const Li = styled.li`
    // background-color: white;
    box-sizing: border-box;
    border-bottom: solid 2px #999;
    // border-radius: 4px;
    display: flex;
    text-align: left;
    justify-content: space-between;
    list-style: none;
    padding: 0 0 1em;
    // margin: 1em 0;
`
const TextArea = styled.textarea`
    background-color: #f8f8f8;
    border: none;
    border-bottom: 1px solid #999;
    box-sizing: border-box;
    border-radius: 4px;
    font-family: 'Ubuntu';
    font-size: 1em;
    padding: 15px;
    margin: 5px 0 20px;
    width: 100%;
    &:focus {
        outline-color: #6a8532;
    }
`
export default Assessments;