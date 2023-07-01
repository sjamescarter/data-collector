import { useParams } from 'react-router-dom';
import Goal from "../components/Goal";

function Student({ students, setStudents }) {
    const { id } = useParams();
    const student = students.find((student) => student.id === parseInt(id));
    const orderedGoals = [...student.goals.sort((a, b) => a.id - b.id)];
    
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
            {orderedGoals.map((goal) => 
                    <Goal 
                        key={goal.id} 
                        goal={goal} 
                        student={student} 
                        onDelete={handleDelete} 
                        handleUpdate={handleUpdate} 
                    />) 
            }
        </div>
    );
}

export default Student;