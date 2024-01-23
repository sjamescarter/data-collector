import { useRef } from "react";
import EditButtons from "./EditButtons";
import styled from "styled-components";
import Modal from "./Modal";
import Warn from "./Warn";

function ObjectiveCard({ objective }) {
    const addData = useRef(null);
    const editObjective = useRef(null);
    const deleteObjective = useRef(null);

    // context
    // Create Assessment
    // Update Assessment
    // Destroy Assessment
    function handleDelete() {
        
    }

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
                <Warn handleDelete={handleDelete} closeModal={() => deleteObjective.close()}/>
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