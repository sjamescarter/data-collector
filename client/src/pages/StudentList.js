import { useEffect, useState } from "react";

function StudentList({ user }) {
    const [students, setStudents] = useState([])

    useEffect(() => {
        fetch('/students')
        .then(r => r.json())
        .then(data => setStudents(data))
    }, [])
// console.log(students[0].name)
    if (!students) return <p>Loading...</p>

    return(
        <div>
            {students.map((student) => <li key={student.name}>{student.initial} {student.name}, Grade: {student.grade_level}</li>)}
            {/* {students[1].name} */}
        </div>
    );
}

export default StudentList;