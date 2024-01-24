import { useContext, useRef, useState } from 'react';
import styled from "styled-components";
import { I } from "../styles/index"
import { submit } from '../components/fetch';
import GoalEditor from '../components/GoalEditor';
import Modal from '../components/Modal';
import Warn from '../components/Warn';
import Objectives from '../components/Objectives';
import EditButtons from '../components/EditButtons';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';

// Student calls Goal
function Goal() {
    const { user } = useContext(UserContext);
    const [onDelete, handleUpdate] = useOutletContext();
    const { studentId, goalId } = useParams();

    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();
    const showAllGoals = () => navigate(`/students/${parseInt(studentId)}`);
    const student = user.students.find((s) => s.id === parseInt(studentId))
    const goal = student.goals.find((g) => g.id === parseInt(goalId));
    
    const editGoal = useRef(null);
    const warnModal = useRef(null);

    const closeWarn = () => warnModal.current.close();

    const handleDelete = () => {
        onDelete(goal.id);
        closeWarn();
        showAllGoals();
    }

    function handleSubmit(e, goalForm) {
        e.preventDefault();
        setErrors([]);

        const callback = (goal) => {
            handleUpdate(goal);
            editGoal.current.close();
        }

        submit('/goals/' + goal.id, 'PATCH', goalForm, callback, setErrors);
    }

    return (
        <Container>
            <GoalHeader>
                <div className='flex' onClick={showAllGoals}>
                    <I className="material-icons">assignment</I>
                    <h3>{goal.subject} Goal</h3>
                </div>
                <EditButtons 
                    title="Goal" 
                    editAction={() => editGoal.current.showModal()} 
                    deleteAction={() => warnModal.current.showModal()} 
                />
            </GoalHeader>
            <p>Given {goal.condition}, {student.name.split(" ")[0]} will {goal.behavior} with {goal.accuracy}% accuracy as measured by {goal.measurement} by the next annual review.</p>
            <Objectives student={student} goal={goal} />
            <Modal ref={editGoal}>
                <GoalEditor 
                    student={student} 
                    goal={goal} 
                    onSubmit={handleSubmit}
                >
                    <div>
                        <StyledSubmit type="submit" value="Save" />
                        <Button type="button" onClick={(e) => {e.preventDefault();editGoal.current.close()}}>Cancel</Button>
                    </div>
                    <ul className="errors">
                        {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                    </ul>
                </GoalEditor>
            </Modal>
            <Modal ref={warnModal}>
                <Warn handleDelete={handleDelete} closeModal={closeWarn} />
            </Modal>
        </Container>
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
const StyledSubmit = styled.input`
    background-color: #6a8532;
    color: white;
    border: 1.5px solid #6a8532; 
    border-radius: 8px;
    font-weight: bold;
    font-size: .8em;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
`
const Button = styled.button`
    background-color: #f8f8f8;
    color: #6a8532;
    border: 1.5px solid #6a8532; 
    border-radius: 8px;
    font-weight: bold;
    font-size: .8em;
    padding: 5px 10px;
    margin: 5px;
    cursor: pointer;
`

export default Goal;