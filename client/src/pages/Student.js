import { useContext, useState } from 'react';
import { useNavigate, useParams, Outlet } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { Header, I, InputSubmit } from '../styles'
import { destroy } from '../components/fetch';
import GoalCard from '../components/GoalCard';
import Modal from '../components/Modal';
import GoalEditor from '../components/GoalEditor';
import Errors from '../components/Errors';
import useUpdate from '../hooks/useUpdate';
import useModal from '../hooks/useModal';
import useHandleSubmit from '../hooks/useHandleSubmit';
import { alphabetize } from '../components/utilities';
import IconButton from '../components/IconButton';

function Student() {
    const { user, setUser, students, setStudents } = useContext(UserContext);
    const { studentId, goalId } = useParams();
    const id = parseInt(studentId);
    const navigate = useNavigate();
    
    const student = students.find((s) => s.id === id); 
    
    const newGoalForm = {
        student_id: id,
        subject: "",
        condition: "", 
        behavior: "", 
        accuracy: "", 
        measurement: ""
    };

    const [goalForm, setGoalForm] = useState(newGoalForm);
    
    const filteredGoals = [...student.goals.filter((goal) => goal.user_id === user.id)];

    // Modal
    const createGoal = useModal();
    const cancelCreateGoal = () => {
        createGoal.close();
        setGoalForm(newGoalForm);
        setErrors();
    };

    // Update State
    const updateStudent = useUpdate(student, 'goals');
    const updateUser = useUpdate(user, 'students');

    function handleUpdate(updatedGoal) {  
        const updatedStudent = updateStudent.updateWith(updatedGoal); 
        if(user.students.find((s) => s.id === id)) {
            setUser(updateUser.updateWith(updatedStudent));
        } else {
            const alphabetizedStudents = alphabetize([...user.students, updatedStudent]);
            setUser({ ...user, students: alphabetizedStudents});
        }
        setStudents([...students.map((s) => s.id === id ? updatedStudent : s)]);
    }
    
    // Create Goal
    const { errors, setErrors, onSubmit } = useHandleSubmit({
        endpoint: '/goals',
        method: 'POST',
        form: goalForm,
        callback: (newGoal) => {
            handleUpdate(newGoal);
            setGoalForm(newGoalForm);
            createGoal.close();
            navigate(`/students/${student.id}`);
        }
    });

    // Delete Goal
    function handleDelete(goalId) {
        const updatedStudent = updateStudent.updateWithout(goalId);

        const callback = () => {
            filteredGoals.length === 1 
                ? setUser({ ...user, students: [...user.students.filter((student) => student.id !== id)]})
                : setUser(updateUser.updateWith(updatedStudent));
            setStudents([...students.map((s) => s.id === id ? updatedStudent : s)]);
        };

        destroy(`/goals/${goalId}`, callback);
    }

    if(!students) { return <h1>Loading...</h1>};
    
    if(!student) { return <h1>Student not found</h1>};


    return (
        <>
            <Header>
                <div style={{position: "relative"}}>
                    <I 
                        className="material-icons" 
                        style={{position: "absolute", top: '1.7em', left: '-1.1em'}}
                        onClick={() => navigate(`/students`)}
                    >
                        arrow_back_ios
                    </I>
                    <Name>{student.name}</Name>
                    <small 
                        style={{position: "absolute", bottom: ".5em"}}
                    >
                        Grade: {student.grade_level}
                    </small>
                </div>
                <IconButton 
                    onClick={createGoal.open}
                    icon='assignment_add'
                    text='New Goal'
                />
            </Header>
            <Container>
                {goalId
                    ? <Outlet context={[handleDelete, handleUpdate, student]} />
                    : <>
                        {filteredGoals.map((goal) => 
                            <GoalCard 
                                key={goal.id} 
                                goal={goal} 
                            />
                        )}
                    </>
                }
                <Modal title='New Goal' ref={createGoal.ref}>
                    <GoalEditor 
                        student={student}
                        goalForm={goalForm}
                        setGoalForm={setGoalForm}
                        onSubmit={onSubmit}
                        cancel={cancelCreateGoal}
                    >
                        <InputSubmit type="submit" value="Create Goal" />
                        <Errors errors={errors} />
                    </GoalEditor>
                </Modal>
            </Container>
        </>
    );
}

const Container = styled.div`
    background-color: #d7dace;
    border-radius: 4px;
    width: 80%;
    padding: .25em 1.2em;
    font-size: 1.25em;
    margin: auto;
    margin-top: .5em;
`
const Name = styled.h1`
    &:hover {
        cursor: pointer;
    }
`
const Button = styled.button`
    align-items: center;
    background-color: #6a8532;
    border: 2px solid #6a8532;
    border-radius: 8px;
    color: white;
    display: flex;
    // flex-flow: row nowrap;
    // justify-content: space-between;
    padding: 4px;
    opacity: .9;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`
export default Student;