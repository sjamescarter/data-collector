import { useContext, useRef, useState } from "react";
import EditButtons from "./EditButtons";
import { destroy, submit } from "./fetch";
import { UserContext } from "../context/user";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import Warn from "./Warn";
import styled from "styled-components";
import { I } from "../styles";
import { handleChange } from "./utilities";

function AssessmentCard({ assessment, objectiveId }) {
    const { studentId, goalId } = useParams();
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const warnModal = useRef(null);
    const closeModal = () => warnModal.current.close();

    const [isEditing, setIsEditing] = useState(false);
    const [assessmentForm, setAssessmentForm] = useState(assessment);
    const [errors, setErrors] = useState();

    // Update Assessment
    function handleSubmit(e) {
        e.preventDefault();
        setErrors();

        const callback = (objective) => {
            setUser({
                ...user, students: [...user.students.map((s) => s.id === parseInt(studentId)
                    ? { ...s, goals: [...s.goals.map((g) => g.id === parseInt(goalId)
                        ? { ...g, objectives: [...g.objectives.map((o) => o.id === objectiveId
                            ? { ...o, result: objective.result, assessments: [...o.assessments.map((a) => a.id === assessment.id
                                ? objective.assessments.find((a) => a.id === assessment.id)
                                : a
                            )]}
                            : o
                        )]}
                        : g
                    )]}
                    : s
                )]
            });
            setStudents([
                ...students.map((s) => s.id === parseInt(studentId)
                    ? { ...s, goals: [...s.goals.map((g) => g.id === parseInt(goalId)
                        ? { ...g, objectives: [...g.objectives.map((o) => o.id === objectiveId
                            ? { ...o, result: objective.result, assessments: [...o.assessments.map((a) => a.id === assessment.id
                                ? objective.assessments.find((a) => a.id === assessment.id)
                                : a
                            )]}
                            : o
                        )]}
                        : g
                    )]}
                    : s
                )
            ]);            
            setIsEditing(false);
        }

        submit(`/objectives/${objectiveId}/assessments/${assessment.id}`, 'PATCH', assessmentForm, callback, setErrors)
    }
    // Destroy Assessment
    function onDelete() {
        warnModal.current.showModal();
    }

    function handleDelete() {
        const callback = () => {
            setUser({
                ...user, students: [...user.students.map((s) => s.id === parseInt(studentId)
                    ? { ...s, goals: [...s.goals.map((g) => g.id === parseInt(goalId)
                        ? { ...g, objectives: [...g.objectives.map((o) => o.id === objectiveId
                            ? { ...o, assessments: [...o.assessments.filter((a) => a.id !== assessment.id)]}
                            : o
                        )]}
                        : g
                    )]}
                    : s
                )]
            });
            setStudents([
                ...students.map((s) => s.id === parseInt(studentId)
                    ? { ...s, goals: [...s.goals.map((g) => g.id === parseInt(goalId)
                        ? { ...g, objectives: [...g.objectives.map((o) => o.id === objectiveId
                            ? { ...o, assessments: [...o.assessments.filter((a) => a.id !== assessment.id)]}
                            : o
                        )]}
                        : g
                    )]}
                    : s
                )
            ]);
        }

        destroy(`/assessments/${assessment.id}`, callback);
    }

    return (
        <>
            <Li>
                {isEditing
                    ? <form onSubmit={(e) => handleSubmit(e)}>
                        <input type="number" name="correct" value={assessmentForm.correct} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                        correct of 
                        <input type="number" name="total" value={assessmentForm.total} onChange={(e) => handleChange(assessmentForm, setAssessmentForm, e)} />
                        trials
                        <input type="submit" value="save" />
                        <ul className="errors">
                        {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                    </ul>
                    </form>
                    : <div>{assessment.correct} correct of {assessment.total} trials</div>
                }
                <EditButtons title="Assessment" editAction={() => setIsEditing(!isEditing)} deleteAction={onDelete} />
            </Li>
            <Modal ref={warnModal}>
                <Warn handleDelete={handleDelete} closeModal={closeModal}/>
            </Modal>
        </>
    );
}

const Li = styled.li`
    align-items: center;
    list-style: none;
    display: flex;
    justify-content: space-between;
    background-color: white;
    box-sizing: border-box;
    border: solid 1px #999;
    border-radius: 4px;
    padding: 4px 4px 4px 10px;
    margin: .25em 0;
`

export default AssessmentCard;