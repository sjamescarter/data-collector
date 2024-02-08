import StudentCard from './StudentCard';

function StudentList({ students }) {

    if (!students) return <p>Loading...</p>
    
    return(
        <div>
            {students.map((student) => 
                <StudentCard 
                    key={student.id} 
                    student={student}  
                />
            )}
        </div>
    );
}

export default StudentList;