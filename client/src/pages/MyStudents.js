import { useEffect, useState } from 'react';
import StudentList from "../components/StudentList";

function MyStudents({ user, students, setStudents }) {
    const [userStudents, setUserStudents] = useState([]);

    useEffect(() => {
        fetch('/my_students').then(r => {
            if (r.ok) {
                r.json()
                .then((data) => setUserStudents(data))
            }
        })
    }, [])

    // const userStudents = [...students.filter((student) => student.user_id === user.id)]

    return (
        <div>
            <h1>My Students</h1>
            {<StudentList students={userStudents} />}
        </div>
    );
}

export default MyStudents;