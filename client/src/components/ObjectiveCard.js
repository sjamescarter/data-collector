import { useContext, useRef, useState } from "react";
import { UserContext } from "../context/user";
import { destroy, submit } from "./fetch";
import styled from "styled-components";
import EditButtons from "./EditButtons";
import Modal from "./Modal";
import Warn from "./Warn";
import { useParams } from "react-router-dom";
import { handleChange } from "./utilities";
import Assessments from "./Assessments";
import Errors from "./Errors";

function ObjectiveCard({ objective }) {
    const { studentId, goalId } = useParams();
    const addData = useRef(null);
    const editObjective = useRef(null);
    const deleteObjective = useRef(null);

    // context
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const student = user.students.find((s) => s.id === parseInt(studentId));
    const goal = student.goals.find((g) => g.id === parseInt(goalId));

    // state
    const [objectiveForm, setObjectiveForm] = useState({description: objective.description})
    const [errors, setErrors] = useState();

    // Update Objective
    const updateObjectiveState = (updatedObjective) => {
        const updatedGoal = { ...goal, objectives: [...goal.objectives.map((o) => o.id === objective.id ? updatedObjective : o)] };
        const updatedStudent = { ...student, goals: [...student.goals.map((g) => g.id === goal.id ? updatedGoal : g)] };
        setUser({...user, students: [...user.students.map((s) => s.id === student.id ? updatedStudent : s)]});
        setStudents([...students.map((s) => s.id === student.id ? updatedStudent : s)]);
    }

    function handleUpdate(e) {
        e.preventDefault();
        setErrors();

        const callback = (updatedObjective) => {
            updateObjectiveState(updatedObjective);
            editObjective.current.close();
        }

        submit(`/objectives/${objective.id}`, "PATCH", objectiveForm, callback, setErrors);
    }

    // Delete Objective
    function handleDelete() {
        const callback = () => {
            const updatedGoal = { ...goal, objectives: [...goal.objectives.filter((o) => o.id !== objective.id)]}
            const updatedStudent = { ...student, goals: [...student.goals.map((g) => g.id === goal.id ? updatedGoal : g)] }
            setUser({ ...user, students: [...user.students.map((s) => s.id === student.id ? updatedStudent : s)]});
            setStudents([...user.students.map((s) => s.id === student.id ? updatedStudent : s)]);
            deleteObjective.current.close();
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
                    addData={() => addData.current.showModal()}
                    editAction={() => editObjective.current.showModal()} 
                    deleteAction={() => deleteObjective.current.showModal()} 
                    />
            </Group>
            <Modal ref={addData}>
                <Assessments objective={objective} updateObjectiveState={updateObjectiveState}>
                    <button onClick={() => addData.current.close()}>Close</button>
                </Assessments>
            </Modal>
            <Modal ref={editObjective}>
                <div>
                    <form onSubmit={(e) => handleUpdate(e)}>
                        <h1>Edit Objective</h1>
                        <textarea 
                            name="description" 
                            rows={10}
                            value={objectiveForm.description} 
                            onChange={(e) => handleChange(objectiveForm, setObjectiveForm, e)} 
                            />
                        <input type="Submit" value="Submit" />
                        <button type="button" onClick={() => editObjective.current.close()}>Cancel</button>
                        <Errors errors={errors} />
                    </form>
                </div>
            </Modal>
            <Modal ref={deleteObjective}>
                <Warn handleDelete={handleDelete} closeModal={() => deleteObjective.current.close()}/>
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