import { useContext, useRef } from "react";
import { UserContext } from "../context/user";
import { destroy } from "./fetch";
import styled from "styled-components";
import EditButtons from "./EditButtons";
import Modal from "./Modal";
import Warn from "./Warn";
import { useParams } from "react-router-dom";

function ObjectiveCard({ objective }) {
    const addData = useRef(null);
    const editObjective = useRef(null);
    const deleteObjective = useRef(null);
    const { studentId, goalId } = useParams();
    // context
    const { user, setUser, students, setStudents } = useContext(UserContext);
    // Update Objective

    // Delete Objective
    function handleDelete() {
        const callback = () => {
            setUser({
                ...user, students: [
                    ...user.students.map((s) => s.id === parseInt(studentId) 
                        ? { ...s, goals: [
                            ...s.goals.map((g) => g.id === parseInt(goalId)
                                ? { ...g, objectives: [...g.objectives.filter((o) => o.id !== objective.id)]}
                                : g
                        )]}
                        : s
                    )
                ]
            });
            setStudents([
                ...students.map((s) => s.id === parseInt(studentId) 
                        ? { ...s, goals: [
                            ...s.goals.map((g) => g.id === goalId
                                ? { ...g, objectives: [...g.objectives.filter((o) => o.id !== objective.id)]}
                                : g
                        )]}
                        : s
                    )
            ]);
            deleteObjective.current.close();
        }

        destroy(`/objectives/${objective.id}`, callback);
    }
    // Create Assessment
    // Update Assessment
    // Destroy Assessment

    return (
        <Container>
            <p>{objective.description}</p>
            <div className="flex" style={{justifyContent: "space-between"}}>
            <p>Result: <b>{objective.result}</b></p>
                <EditButtons 
                    title="Objective" 
                    addData={(e) => {
                        e.stopPropagation();
                        addData.current.showModal();
                    }}
                    editAction={(e) => {
                        e.stopPropagation();
                        editObjective.current.showModal();
                    }} 
                    deleteAction={(e) => {
                        e.stopPropagation();
                        deleteObjective.current.showModal();
                    }} 
                />
            </div>
            <Modal ref={addData}>
                <div>
                    <h1>Add Data</h1>
                    <ol>
                        {objective.assessments.map((assessment) => <li key={assessment.id}>Correct Trials: {assessment.correct} Total Trials: {assessment.total}</li>)}
                    </ol>
                </div>
            </Modal>
            <Modal ref={editObjective}>
                
            </Modal>
            <Modal ref={deleteObjective}>
                <Warn handleDelete={handleDelete} closeModal={() => deleteObjective.current.close()}/>
            </Modal>
        </Container>
    );
} 

const Container = styled.div`
    display: block;
    align-items: center;
    // justify-content: space-between;
    gap: 10px;
    border-bottom: solid 1px #d7dace;
    // border-radius: 4px;
    // padding: 10px;
    margin: 10px 0;
    box-sizing; border-box;
`
export default ObjectiveCard;