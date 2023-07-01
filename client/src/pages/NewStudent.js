import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormContainer, InputContainer, InputIcon, InputSubmit } from '../styles/';

function NewStudent({ students, setStudents }) {
    const [form, setForm] = useState({first_name: "", last_name: "", grade_level: ""})
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
            body: JSON.stringify(form)
        })
        .then((r) => {
            if (r.ok) {
                r.json().then((student) => {
                    setStudents([...students, student])
                    setForm({first_name: "", last_name: "", grade_level: ""});
                    navigate(`/students/${student.id}/goals/new`);
                });
            } else {
                r.json().then((err) => setErrors(err.errors))
            }
        })
    }

    return (
        <>
            <h1>New Student</h1>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <InputIcon className='material-icons'>person</InputIcon>
                        <InputField type="text" name="first_name" placeholder="First Name" value={form.first_name} onChange={handleChange} />
                        <InputField  type="text" name="last_name" placeholder="Last Name" value={form.last_name} onChange={handleChange} />
                    </InputContainer>
                    <InputContainer>
                        <InputIcon className='material-icons'>school</InputIcon>
                        <InputField  type="number" name="grade_level" placeholder="Grade Level: 1–12" value={form.grade_level} onChange={handleChange} />
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