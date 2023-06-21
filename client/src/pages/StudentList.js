import Student from '../components/Student';

function StudentList({ user, students }) {
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

    return(
        <div>
            <h1>Students</h1>
            
            {/* Need a search bar and/or filters here */}

            {abc.map((student) => <Student key={student.name} student={student} />)}
        </div>
    );
}

export default StudentList;