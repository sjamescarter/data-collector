import { useState } from 'react';
import styled from 'styled-components';

function NewStudent({ students, setStudents }) {
    const [form, setForm] = useState({first_name: "", last_name: "", grade_level: ""})
    const [errors, setErrors] = useState([]);

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
                r.json().then((student) => setStudents([...students, student]));
                setForm({first_name: "", last_name: "", grade_level: ""});
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

const FormContainer = styled.div`
    border-radius: 10px;
    background-color: white;
    width: 500px;
    margin: auto;
    margin-top: 30px;
    padding: 30px;
    box-shadow: 0 15px 16.83px 0.17px rgba(0, 0, 0, 0.05);
`

const InputContainer = styled.div`
    display: flex;
    width: 100%;
    margin-bottom: 30px;
`

const InputIcon = styled.i`
    border: none;
    border-bottom: 1px solid #999;
`

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

const InputSubmit = styled.input`
    background-color: #6a8532;
    border: none;
    border-radius: 4px;
    color: white;
    cursor: pointer;
    padding: 15px 20px;
    width: 100%;
    opacity: 0.9;
    font-size: 1.1em;
    font-weight: bold;
    font-family: 'Ubuntu';
    &:hover {
        opacity: 1;
    }
`

export default NewStudent;