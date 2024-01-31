import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import { FormContainer, Header, InputContainer, InputIcon, InputSubmit } from '../styles/';
import { handleChange } from '../components/utilities';
import Errors from '../components/Errors';

const newStudentForm = {firstName: "", lastName: "", gradeLevel: ""}

function NewStudent({ newForm=newStudentForm }) {
    const { students, setStudents } = useContext(UserContext);

    const { name } = useParams();
    if(name) {
        newForm = { 
            firstName: name.split(" ")[1], 
            lastName: name.split(" ")[0] || "",
            gradeLevel: ""
        }
    }

    const [form, setForm] = useState(newForm)
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate();

    const change = (e) => handleChange(form, setForm, e)

    function handleSubmit(e) {
        e.preventDefault();
        setErrors();
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
                    navigate(`/students/${student.id}`);
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
                        <InputField type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={change} />
                        <InputField  type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <InputIcon className='material-icons'>school</InputIcon>
                        <InputField  type="number" name="gradeLevel" placeholder="Grade Level: 1–12" value={form.gradeLevel} onChange={change} />
                    </InputContainer>
                    <InputContainer>
                        <InputSubmit  type="submit" value="Create Student" />
                    </InputContainer>
                </form>
                <Errors errors={errors} />
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