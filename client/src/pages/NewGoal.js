import { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';
import Search from '../components/Search';
import { FormContainer, Header, InputSubmit, Li } from '../styles/';
import GoalEditor from '../components/GoalEditor';
import { alphabetize, filter } from '../components/utilities';

const newGoal = {
    student_id: "",
    condition: "", 
    behavior: "", 
    accuracy: "", 
    measurement: ""
}

function NewGoal({ goal=newGoal }) {
    const { students, setStudents } = useContext(UserContext);

    const { id } = useParams();
    if(id) { goal.student_id = parseInt(id, 10); } 
    if(!id) { goal.student_id = ""; }

    const [allStudents, setAllStudents] = useState([{name: "Loading"}])
    const [search, setSearch] = useState("");
    const [goalForm, setGoalForm] = useState(goal);
    const [errors, setErrors] = useState([]);
    
    const abc = alphabetize(allStudents);
    const filtered = filter(abc, search);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/students')
        .then(r => r.json())
        .then(data => setAllStudents(data))
    }, [])

    function handleSubmit(e, goalForm) {
        e.preventDefault();
        setErrors([]);
        fetch('/goals', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(goalForm)
        })
        .then((r) => {
            if (r.ok) {
                r.json()
                .then((goal) => {
                    const student = [...students].find((student) => student.id === goal.student.id);
                    setStudents([
                        ...students.filter((s) => s.id !== student.id),
                        {...student, goals: [...student.goals, goal]}
                    ]);
                    navigate(`/students/${goal.student.id}`);
                    setGoalForm(newGoal);
                });
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    const student = students.find((student) => student.id === goalForm.student_id)

    function handleClick(s) {
        setGoalForm({
            ...goalForm, 
            student_id: s.id,
        });
        if(!student) { 
            setStudents([...students, s])
        };
        setSearch("");
    }

    return (
        <>
            <Header>
                <h1>New Goal</h1>
            </Header>
            {goalForm.student_id 
                ? <FormContainer>
                    <h3>Goal</h3>
                    <GoalEditor 
                        student={student}
                        goal={goalForm}
                        onSubmit={handleSubmit}
                    >
                        <InputSubmit type="submit" value="Create Goal" />
                        <ul className="errors">
                            {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                        </ul>
                    </GoalEditor>
                </FormContainer>
                : <Search search={search} setSearch={setSearch}>
                    <ul>
                        {search 
                            ? <ul>
                                {filtered.map((s) => <Li 
                                    key={s.id} 
                                    onClick={() => handleClick(s)}
                                >{s.name}</Li>)}
                                <Li onClick={() => navigate(`/students/new/${search}`)}>
                                    Create New Student "<strong>{search}</strong>"
                                </Li>
                            </ul>
                            : null
                        }
                    </ul>
                </Search>
            }
        </>
    );
}

export default NewGoal;