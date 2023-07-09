import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, Header, InputContainer, InputIcon, InputSubmit } from '../styles/';

const newStudentForm = {firstName: "", lastName: "", gradeLevel: ""}

function NewStudent({ newForm=newStudentForm }) {
    const { students, setStudents } = useContext(UserContext);

    const { name } = useParams();
    if(name) {
        newForm = { 
            firstName: name.split(" ")[0], 
            lastName: name.split(" ")[1] || "",
            gradeLevel: ""
        }
    }

    const [form, setForm] = useState(newForm)
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    function handleChange(e) {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit(e) {
        e.preventDefault();
        setErrors([]);
        fetch("/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                first_name: form.firstName,
                last_name: form.lastName,
                grade_level: form.gradeLevel
            })
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((student) => {
                    setStudents([...students, student])
                    setForm(newStudentForm);
                    navigate(`/goals/new/students/${student.id}`);
                });
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <>
            <Header>
                <h1>New Student</h1>
            </Header>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputIcon className='material-icons'>person</InputIcon>
                        <InputField type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={handleChange} />
                        <InputField  type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={handleChange} />
                    </InputContainer>
                    <InputContainer>
                        <InputIcon className='material-icons'>school</InputIcon>
                        <InputField  type="number" name="gradeLevel" placeholder="Grade Level: 1–12" value={form.gradeLevel} onChange={handleChange} />
                    </InputContainer>
                    <InputContainer>
                        <InputSubmit  type="submit" value="Create Student" />
                    </InputContainer>
                </form>
                <ul className="errors">
                    {errors ? errors.map((error) => <li key={error}>{error}</li>) : null}
                </ul>
            </FormContainer>
        </>
    );
}

const InputField = styled.input`
    width: 100%;
    display: flex;
    border: none;
    border-bottom: 1px solid #999;
    padding: 6px;
    font-family: 'Ubuntu';
    box-sizing: border-box;
    font-size: 1em;
    &:focus {
        outline-color: #6a8532;
    }
`

export default NewStudent;