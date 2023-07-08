import { useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import Goal from "../components/Goal";

function Student() {
    const { user, students, setStudents } = useContext(UserContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const student = students.find((student) => student.id === parseInt(id));

    const filteredGoals = [...student.goals.filter((goal) => goal.user_id === user.id)];
    const orderedGoals = [...filteredGoals.sort((a, b) => a.id - b.id)];

    function handleUpdate(studentId, updatedGoal) {
        const student = [...students].find((student) => student.id === studentId);
        const goals = student.goals.filter((goal) => goal.id !== updatedGoal.id);

        setStudents([
            ...students.filter((student) => student.id !== studentId),
            {...student, goals: [...goals, updatedGoal]}
        ]);
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
            <Head>
                <h1>{student.name}</h1>
                <Button onClick={() => navigate(`/goals/new/students/${student.id}`)}>
                    <i 
                        style={{padding: '0 6px'}}
                        className="material-icons" 
                    >
                        assignment_add
                    </i>
                    <p style={{padding: '0 6px 0 0'}}>Add New Goal</p>
                </Button>
            </Head>
            <Container>
                {filteredGoals.length === 0 
                    ? <p>Add a goal for {student.name} to keep in caseload.</p>
                    : orderedGoals.map((goal) => 
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

const Head = styled.div`
    align-items: center;
    border-bottom: 1px solid #999;
    display: grid;
    font-size: 1.25em;
    grid-template-columns: auto 140px;
    margin: auto;
    padding: 10px;
    width: 80%;
`

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