import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { Header } from '../styles'
import Goal from "../components/Goal";

function Student() {
    const { user, setUser } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const student = user.students.find((student) => student.id === parseInt(id));
    
    if(!student) { return <h1>Student not found</h1>}

    const filteredGoals = [...student.goals.filter((goal) => goal.user_id === user.id)];

    function handleUpdate(studentId, updatedGoal) {
        const goals = student.goals.map((goal) => goal.id === updatedGoal.id ? updatedGoal : goal);

        setUser({ ...user, students: [
            ...user.students.map((student) => student.id === studentId 
            ? {...student, goals: [...goals]} 
            : student)
        ]});
    }

    function handleDelete(goalId, studentId) {
        // put in a confirmation before delete
        const goals = student.goals.filter((goal) => goal.id !== goalId)

        fetch('/goals/' + goalId, {
            method: 'DELETE'
        })
        .then((r) => {
            if(r.ok) {
                filteredGoals.length === 1 
                ? setUser({ ...user, students: [
                    ...user.students.filter((student) => student.id !== studentId)]})
                : setUser({ ...user, students: [
                    ...user.students.filter((student) => student.id !== studentId),
                    {...student, goals}
                ]});
            }
        })
    }

    return (
        <div>
            <Header>
                <div>
                    <h1 style={{margin: "0"}}>{student.name}</h1>
                    <small>Grade: {student.grade_level}</small>
                </div>
                <Button onClick={() => navigate(`/goals/new/students/${student.id}`)}>
                    <i 
                        style={{padding: '0 6px'}}
                        className="material-icons" 
                    >
                        assignment_add
                    </i>
                    <p>New Goal</p>
                </Button>
            </Header>
            <Container>
                {filteredGoals.map((goal) => 
                        <Goal 
                        key={goal.id} 
                        goal={goal} 
                        student={student} 
                        onDelete={handleDelete} 
                        handleUpdate={handleUpdate} 
                    />)
                }
            </Container>
        </div>
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

const Button = styled.button`
    align-items: center;
    background-color: #6a8532;
    border: 2px solid #6a8532;
    border-radius: 8px;
    color: white;
    display: flex;
    padding: 4px;
    opacity: .9;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`
export default Student;