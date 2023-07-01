import StudentCard from './StudentCard';

function StudentList({ students }) {

    if (!students) return <p>Loading...</p>

    const abc = [...students].sort((a, b) => {
        const nameA = a.name
        const nameB = b.name
        if (nameA < nameB) {
          return -1;
        }
        if (nameA > nameB) {
          return 1;
        }
    })

    return(
        <div>
            {abc.map((student) => 
                <StudentCard 
                    key={student.id} 
                    student={student}  
                />
            )}
        </div>
    );
}

export default StudentList;