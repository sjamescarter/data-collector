import { useContext, useRef } from "react";
import { UserContext } from "../context/user";
import styled from "styled-components";
import { I } from "../styles";
import ObjectiveCard from "./ObjectiveCard";
import Modal from "./Modal";

function Objectives({ goal }) {
    const { id, objectives } = goal;
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const createObjective = useRef(null);

    // Create Objective
    // function 
    // Update Objective
    // Delete Objective

    return (
        <div>
            <div style={{display: "flex", alignItems: "center", borderBottom: "solid 2px #d7dace", justifyContent: "space-between"}}>
                <div className="flex">
                    <I className="material-icons">task_alt</I>
                    <h4>Objectives</h4>
                </div>
                <Button 
                    onClick={(e) => {
                        e.stopPropagation();
                        createObjective.current.showModal();
                    }}
                >
                    <i 
                        style={{padding: '0 4px'}}
                        className="material-icons" 
                        >
                        add_task
                    </i>
                    <p style={{padding: '0 4px 0 0'}}>New Objective</p>
                </Button>
            </div>
            {objectives
                ? objectives.map((obj) => <ObjectiveCard key={obj.id} objective={obj} />)
                : null
            }
            <Modal ref={createObjective}>

            </Modal>
        </div>
    );
}

const Button = styled.button`
    align-items: center;
    background-color: #6a8532;
    border: 2px solid #6a8532;
    border-radius: 4px;
    color: white;
    display: flex;
    // flex-flow: row nowrap;
    // justify-content: space-between;
    padding: 4px;
    opacity: .9;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`

export default Objectives;