// import { useEffect, useState } from "react";
import Student from '../components/Student';

function StudentList({ user, students }) {
    // const [students, setStudents] = useState([])

    // useEffect(() => {
    //     fetch('/students')
    //     .then(r => r.json())
    //     .then(data => setStudents(data))
    // }, [])

    if (!students) return <p>Loading...</p>

    return(
        <div>
            <h1>Students</h1>
            {students.map((student) => <Student key={student.name} student={student} />)}
        </div>
    );
}

export default StudentList;