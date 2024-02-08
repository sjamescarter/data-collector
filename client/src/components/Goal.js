import { useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import styled from "styled-components";
import { I, InputSubmit } from "../styles/index"
import useModal from '../hooks/useModal';
import useHandleSubmit from '../hooks/useHandleSubmit';
import EditButtons from '../components/EditButtons';
import Errors from './Errors';
import GoalEditor from '../components/GoalEditor';
import Modal from '../components/Modal';
import Objectives from '../components/Objectives';
import Warn from '../components/Warn';

function Goal() {
    // Context
    const [onDelete, handleUpdate, student] = useOutletContext();
    const { goalId } = useParams();
    const goal = student.goals.find((g) => g.id === parseInt(goalId));

    // State
    const [goalForm, setGoalForm] = useState({...goal});

    // Navigation
    const navigate = useNavigate();
    const showAllGoals = () => navigate(`/students/${student.id}`);

    // Modal
    const editGoal = useModal();
    const cancelEditGoal = () => {
        editGoal.close();
        setErrors();
        setGoalForm({...goal});
    }
    const warning = useModal();

    // Update Goal
    const { errors, setErrors, onSubmit } = useHandleSubmit({
        endpoint: `/goals/${goal.id}`,
        method: 'PATCH',
        form: goalForm,
        callback: (goal) => {
            handleUpdate(goal); // prop from Student
            editGoal.close();
        }
    })

    // Delete Goal
    const handleDelete = () => {
        onDelete(goal.id);
        warning.close();
        showAllGoals();
    }

    return (
        <>
            <Container>
                <GoalHeader>
                    <div className='flex' onClick={showAllGoals}>
                        <I className="material-icons">arrow_back_ios_new</I>
                        <h3>{goal.subject} Goal</h3>
                    </div>
                    <EditButtons 
                        title="Goal" 
                        editAction={editGoal.open} 
                        deleteAction={warning.open} 
                    />
                </GoalHeader>
                <p>{goal.summary}</p>
            </Container>
            <Container>
                <Objectives 
                    student={student} 
                    goal={goal} 
                    handleUpdate={handleUpdate} 
                />
            </Container>
            <Modal title='Goal Editor' ref={editGoal.ref}>
                <GoalEditor 
                    student={student} 
                    goalForm={goalForm}
                    setGoalForm={setGoalForm} 
                    onSubmit={onSubmit}
                    cancel={cancelEditGoal}
                >
                    <div>
                        <InputSubmit type="submit" value="Save Goal" />
                    </div>
                    <Errors errors={errors} />
                </GoalEditor>
            </Modal>
            <Modal title={`Delete ${goal.subject} Goal`} ref={warning.ref}>
                <Warn handleDelete={handleDelete} closeModal={warning.close} />
            </Modal>
        </>
    );
}

const Container = styled.div`
    background-color: white;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 5px 15px;
    margin-top: 1em;
    margin-bottom: 1em;
`
const GoalHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: solid 2px #d7dace;
    &:hover {
        cursor: pointer;
    }
`
export default Goal;