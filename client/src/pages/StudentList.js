import Student from '../components/Student';

function StudentList({ user, students, setStudents }) {
    if (!students) return <p>Loading...</p>

    const abc = [...students].sort((a, b) => {
        const nameA = a.initial
        const nameB = b.initial
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;}
    })

    function handleDelete(goalId, studentId) {
        const student = [...students].find((student) => student.id === studentId)
        const goals = student.goals.filter((goal) => goal.id !== goalId)

        fetch('/goals/' + goalId, {
            method: 'DELETE'
        })
        .then(() => setStudents([
            ...students.filter((student) => student.id !== studentId),
            {...student, goals}
        ]))
    }

    return(
        <div>
            <h1>Students</h1>
            
            {/* Need a search bar and/or filters here */}

            {abc.map((student) => <Student key={student.name} student={student} onDelete={handleDelete} />)}
        </div>
    );
}

export default StudentList;