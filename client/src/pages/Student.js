import { useContext, useRef, useState } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { Header, InputSubmit } from '../styles'
import { destroy, submit } from '../components/fetch';
import GoalCard from '../components/GoalCard';
import Modal from '../components/Modal';
import GoalEditor from '../components/GoalEditor';
import Errors from '../components/Errors';

function Student() {
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const { studentId, goalId } = useParams();
    const id = parseInt(studentId);
    const navigate = useNavigate();
    
    const [errors, setErrors] = useState();
    
    const createGoal = useRef(null);

    if(!students) { return <h1>Loading...</h1>}
    const student = students.find((s) => s.id === id);
    
    if(!student) { return <h1>Student not found</h1>}

    const filteredGoals = [...student.goals.filter((goal) => goal.user_id === user.id)];

    function handleSubmit(e, goalForm) {
        e.preventDefault();
        setErrors();
        
        const callback = (newGoal) => {
            const updatedGoals = [...student.goals, newGoal];
            const updatedStudent = { ...student, goals: updatedGoals };
            setUser({ ...user, students: [...user.students.map((s) => s.id === student.id ? updatedStudent : s)] });
            setStudents([...students.map((s) => s.id === student.id ? updatedStudent : s)]);
            createGoal.current.close();
        }

        submit('/goals', 'POST', goalForm, callback, setErrors);
    }

    function handleUpdate(updatedGoal) {
        const updatedGoals = [...student.goals.map((g) => g.id === updatedGoal.id ? updatedGoal : g)];
        const updatedStudent = { ...student, goals: updatedGoals };        
        setUser({ ...user, students: [...user.students.map((s) => s.id === id ? updatedStudent : s)]});
        setStudents([...students.map((s) => s.id === id ? updatedStudent : s)]);
    }

    function handleDelete(goalId) {
        const updatedGoals = [...student.goals.filter((goal) => goal.id !== goalId)];

        const callback = () => {
            filteredGoals.length === 1 
                ? setUser({ ...user, students: [...user.students.filter((student) => student.id !== id)]})
                : setUser({ ...user, students: [...user.students.map((s) => s.id === id ? { ...s, goals: updatedGoals } : s)] });
            setStudents([...students.map((s) => s.id === id ? { ...s, goals: updatedGoals } : s)]);
        }

        destroy('/goals/' + goalId, callback);
    }

    return (
        <>
            <Header>
                <div style={{position: "relative"}}>
                    <Name onClick={() => navigate(`/students/${student.id}`)}>{student.name}</Name>
                    <small style={{position: "absolute", bottom: ".5em"}}>Grade: {student.grade_level}</small>
                </div>
                <Button onClick={() => createGoal.current.showModal()}>
                    <i 
                        style={{padding: '0 6px'}}
                        className="material-icons" 
                    >
                        assignment_add
                    </i>
                    <p style={{padding: '0 6px 0 0'}}>New Goal</p>
                </Button>
            </Header>
            <Container>
                {goalId
                    ? <Outlet context={[handleDelete, handleUpdate]} />
                    : <>
                        {filteredGoals.map((goal) => 
                            <GoalCard 
                                key={goal.id} 
                                goal={goal} 
                            />
                        )}
                    </>
                }
            </Container>
            <Modal ref={createGoal}>
                <GoalEditor 
                    student={student}
                    goal={{
                        student_id: student.id,
                        subject: "",
                        condition: "", 
                        behavior: "", 
                        accuracy: "", 
                        measurement: ""
                    }}
                    onSubmit={handleSubmit}
                >
                    <InputSubmit type="submit" value="Create Goal" />
                    <Errors errors={errors} />
                </GoalEditor>
            </Modal>
        </>
    );
}

const Container = styled.div`
    background-color: #d7dace;
    border-radius: 4px;
    width: 80%;
    padding: .25em 1.2em;
    font-size: 1.25em;
    margin: auto;
    margin-top: .5em;
`
const Name = styled.h1`
    &:hover {
        cursor: pointer;
    }
`
const Button = styled.button`
    align-items: center;
    background-color: #6a8532;
    border: 2px solid #6a8532;
    border-radius: 8px;
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
export default Student;