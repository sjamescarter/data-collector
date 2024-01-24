import { useContext } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { Header } from '../styles'
import { destroy } from '../components/fetch';
import GoalCard from '../components/GoalCard';

function Student() {
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const { studentId, goalId } = useParams();
    const id = parseInt(studentId)

    const navigate = useNavigate();
    const student = user.students.find((student) => student.id === id);
    
    if(!student) { return <h1>Student not found</h1>}

    const filteredGoals = [...student.goals.filter((goal) => goal.user_id === user.id)];

    function handleUpdate(updatedGoal) {
        const goals = student.goals.map((goal) => goal.id === updatedGoal.id ? updatedGoal : goal);

        setUser({ ...user, students: [
            ...user.students.map((student) => student.id === id 
            ? {...student, goals: [...goals]} 
            : student)
        ]});
    }

    function handleDelete(goalId) {
        const goals = student.goals.filter((goal) => goal.id !== goalId)

        const callback = () => {
            filteredGoals.length === 1 
            ? setUser({ ...user, students: [
                ...user.students.filter((student) => student.id !== id)]})
            : setUser({ ...user, students: [
                ...user.students.map((student) => student.id === id
                ? {...student, goals}
                : student
                )]});
            setStudents([...students.map((student) => student.id === id
                ? {...student, goals}
                : student
            )]);
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
                <Button onClick={() => navigate(`/goals/new/students/${student.id}`)}>
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
                                student={student} 
                            />
                        )}
                    </>
                }
            </Container>
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
    opacity: .9;
    &:hover {
        opacity: 1;
    }
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