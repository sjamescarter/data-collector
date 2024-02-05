import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/user";
import { destroy } from "./fetch";
import styled from "styled-components";
import EditButtons from "./EditButtons";
import Modal from "./Modal";
import Warn from "./Warn";
import { useParams } from "react-router-dom";
import { handleChange } from "./utilities";
import Assessments from "./Assessments";
import Errors from "./Errors";
import useHandleSubmit from "../hooks/useHandleSubmit";
import useUpdate from "../hooks/useUpdate";
import useModal from "../hooks/useModal";

function ObjectiveCard({ objective, updateObjectiveState }) {
    const { studentId, goalId } = useParams();
    const { user, setUser, students, setStudents } = useContext(UserContext);

    const student = user.students.find((s) => s.id === parseInt(studentId)); 
    const goal = student.goals.find((g) => g.id === parseInt(goalId));

    const updateGoal = useUpdate(goal, 'objectives');
    const updateStudent = useUpdate(student, 'goals');
    const updateUser = useUpdate(user, 'students');

    // Modals
    const addData = useModal();
    const editObjective = useModal();
    const deleteObjective = useModal();

    // State
    const [objectiveForm, setObjectiveForm] = useState({description: objective.description})

    // Update Objective
    const { errors, onSubmit } = useHandleSubmit({
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
            const updatedStudent = updateStudent.updateWith(updatedGoal);
            setUser(updateUser.updateWith(updatedStudent));
            setStudents([...students.map((s) => s.id === student.id ? updatedStudent : s)]);
            deleteObjective.close();
        }

        destroy(`/objectives/${objective.id}`, callback);
    }

    return (
        <Container>
            <p>{objective.description}</p>
            <Group>
                <Circle>{objective.result || "No Data"}</Circle>
                <EditButtons 
                    title="Objective" 
                    addData={addData.open}
                    editAction={editObjective.open} 
                    deleteAction={deleteObjective.open} 
                    />
            </Group>
            <Modal ref={addData.ref}>
                <Assessments objective={objective} updateObjectiveState={updateObjectiveState}>
                    <button onClick={addData.close}>Close</button>
                </Assessments>
            </Modal>
            <Modal ref={editObjective.ref}>
                <form onSubmit={onSubmit}>
                    <h1>Edit Objective</h1>
                    <textarea 
                        name="description" 
                        rows={10}
                        value={objectiveForm.description} 
                        onChange={(e) => handleChange(objectiveForm, setObjectiveForm, e)} 
                        />
                    <input type="Submit" value="Submit" />
                    <button type="button" onClick={editObjective.close}>Cancel</button>
                    <Errors errors={errors} />
                </form>
            </Modal>
            <Modal ref={deleteObjective.ref}>
                <Warn handleDelete={handleDelete} closeModal={deleteObjective.close}/>
            </Modal>
        </Container>
    );
} 

const Container = styled.div`
    display: flex;
    // background-color: white;
    // align-items: top;
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
const Circle = styled.div`
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
export default ObjectiveCard;