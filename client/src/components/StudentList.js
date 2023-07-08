import StudentCard from './StudentCard';
import { alphabetize } from './utilities';

function StudentList({ students }) {

    if (!students) return <p>Loading...</p>
    
    const abc = alphabetize(students);

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