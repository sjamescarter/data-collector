import { useContext, useRef, useState } from "react";
import EditButtons from "./EditButtons";
import { destroy, submit } from "./fetch";
import { UserContext } from "../context/user";
import { useParams } from "react-router-dom";
import Modal from "./Modal";
import Warn from "./Warn";
import styled from "styled-components";
import { handleChange } from "./utilities";
import Errors from "./Errors";

function AssessmentCard({ assessment, objectiveId }) {
    const { studentId, goalId } = useParams();
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const student = user.students.find((s) => s.id === parseInt(studentId))
    const goal = student.goals.find((g) => g.id === parseInt(goalId));
    const objective = goal.objectives.find((o) => o.id === objectiveId);

    const warnModal = useRef(null);
    const closeModal = () => warnModal.current.close();

    const [isEditing, setIsEditing] = useState(false);
    const [assessmentForm, setAssessmentForm] = useState(assessment);
    const [errors, setErrors] = useState();

    // Update Assessment
    function handleSubmit(e) {
        e.preventDefault();
        setErrors();

        const callback = (returnedObjective) => {
            const updatedAssessment = returnedObjective.assessments.find((a) => a.id === assessment.id);
            const updatedObjective = { ...objective, result: returnedObjective.result, assessments: [...objective.assessments.map((a) => a.id === assessment.id ? updatedAssessment : a)] };
            const updatedGoal = { ...goal, objectives: [...goal.objectives.map((o) => o.id === objective.id ? updatedObjective : o)] };
            const updatedStudent = { ...student, goals: [...student.goals.map((g) => g.id === goal.id ? updatedGoal : g)] };
            setUser({ ...user, students: [...students.map((s) => s.id === student.id ? updatedStudent : s)] });
            setStudents([...students.map((s) => s.id === student.id ? updatedStudent : s)]);            
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
            const updatedAssessments = [...objective.assessments.filter((a) => a.id !== assessment.id)];
            const updatedObjective = { ...objective, assessments: updatedAssessments };
            const updatedGoal = { ...goal, objectives: [...goal.objectives.map((o) => o.id === objective.id ? updatedObjective : o)] };
            const updatedStudent = { ...student, goals: [...student.goals.map((g) => g.id === goal.id ? updatedGoal : g)] };
            setUser({ ...user, students: [...user.students.map((s) => s.id === student.id ? updatedStudent : s)] });
            setStudents([...students.map((s) => s.id === student.id ? updatedStudent : s)]);
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
                        <Errors errors={errors} />
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