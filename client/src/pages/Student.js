import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Goal from "../components/Goal";

function Student({ user, students, setStudents }) {
    const { id } = useParams();
    const student = students.find((student) => student.id === parseInt(id));
    const filteredGoals = [...student.goals.filter((goal) => goal.user_id === user.id)];
    const orderedGoals = [...filteredGoals.sort((a, b) => a.id - b.id)];

    function handleUpdate(studentId, updatedGoal) {
        const student = [...students].find((student) => student.id === studentId)
        const goals = student.goals.filter((goal) => goal.id !== updatedGoal.id)

        setStudents([
            ...students.filter((student) => student.id !== studentId),
            {...student, goals: [...goals, updatedGoal]}
        ])
    }

    function handleDelete(goalId, studentId) {
        // put in a confirmation before delete
        const student = [...students].find((student) => student.id === studentId)
        const goals = student.goals.filter((goal) => goal.id !== goalId)

        fetch('/goals/' + goalId, {
            method: 'DELETE'
        })
        .then((r) => {
            if(r.ok) {
                setStudents([
                    ...students.filter((student) => student.id !== studentId),
                    {...student, goals}
                ])
            }
        })
    }

    return (
        <div>
            <h1>{student.name}</h1>
            <Container>
                {orderedGoals.map((goal) => 
                    <Goal 
                    key={goal.id} 
                    goal={goal} 
                    student={student} 
                    onDelete={handleDelete} 
                    handleUpdate={handleUpdate} 
                />)}
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
export default Student;