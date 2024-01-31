import { useContext, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from '../context/user';
import Search from '../components/Search';
import { FormContainer, Header, InputSubmit, Li } from '../styles/';
import GoalEditor from '../components/GoalEditor';
import { alphabetize, filter } from '../components/utilities';
import styled from 'styled-components';
import Errors from '../components/Errors';

const newGoal = {
    student_id: "",
    subject: "",
    condition: "", 
    behavior: "", 
    accuracy: "", 
    measurement: ""
}

function NewGoal({ goal=newGoal }) {
    const { user, setUser, students, setStudents } = useContext(UserContext);

    const { id } = useParams();
    if(id) { goal.student_id = parseInt(id, 10); } 
    if(!id) { goal.student_id = ""; }

    const [search, setSearch] = useState("");
    const [goalForm, setGoalForm] = useState(goal);
    const [errors, setErrors] = useState();
    
    const abc = alphabetize(students);
    const filtered = filter(abc, search);
    const navigate = useNavigate();

    function handleSubmit(e, goalForm) {
        e.preventDefault();
        setErrors();
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
                    setUser({ ...user, students: [
                        ...user.students.map((s) => s.id === student.id
                        ? {...s, goals: [...s.goals, goal]}
                        : s
                        )
                    ]});
                    setStudents([...students.map((s) => s.id === student.id
                        ? {...s, goals: [...s.goals, goal]}
                        : s
                    )])
                    navigate(`/students/${student.id}`);
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
        setSearch("");
    }

    return (
        <>
            <Header>
                <h1>New Goal</h1>
            </Header>
            {goalForm.student_id 
                ? <FormContainer>
                    <GoalEditor 
                        student={student}
                        goal={goalForm}
                        onSubmit={handleSubmit}
                    >
                        <InputSubmit type="submit" value="Create Goal" />
                        <Errors errors={errors} />
                    </GoalEditor>
                </FormContainer>
                : <Search search={search} setSearch={setSearch}>
                    <ul>
                        {search 
                            ? <Ul>
                                {filtered.map((s) => <Li 
                                    key={s.id} 
                                    onClick={() => handleClick(s)}
                                >{s.name}</Li>)}
                                <Li onClick={() => navigate(`/students/new/${search}`)}>
                                    Create New Student "<strong>{search}</strong>"
                                </Li>
                            </Ul>
                            : null
                        }
                    </ul>
                </Search>
            }
        </>
    );
}

const Ul = styled.ul`
    background-color: #FFF;
    border: solid 2px #6a8532;
    border-radius: 4px;
    padding: 16px;
`
export default NewGoal;