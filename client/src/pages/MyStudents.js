import { useEffect, useState } from 'react';
import StudentList from "../components/StudentList";

function MyStudents() {
    const [userStudents, setUserStudents] = useState([]);

    useEffect(() => {
        fetch('/my_students').then(r => {
            if (r.ok) {
                r.json()
                .then((data) => setUserStudents(data))
            }
        })
    }, [])

    return (
        <div>
            <h1>My Students</h1>
            {<StudentList students={userStudents} setStudents={setUserStudents}/>}
        </div>
    );
}

export default MyStudents;