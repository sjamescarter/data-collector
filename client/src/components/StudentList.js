import Student from './Student';

function StudentList({ students, setStudents }) {

    if (!students) return <p>Loading...</p>

    const abc = [...students].sort((a, b) => {
        const nameA = a.initial
        const nameB = b.initial
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
    })

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

    return(
        <div>
            {abc.map((student) => <Student 
                key={student.name} 
                student={student} 
                onDelete={handleDelete} 
                handleUpdate={handleUpdate} 
            />)}
        </div>
    );
}

export default StudentList;