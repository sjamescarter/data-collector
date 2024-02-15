import { useContext, useState } from 'react';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { FormContainer, Header, InputContainer, InputIcon, InputSubmit } from '../styles/';
import { alphabetize, handleChange } from '../components/utilities';
import Errors from '../components/Errors';
import useHandleSubmit from '../hooks/useHandleSubmit';

const newStudentForm = {firstName: "", lastName: "", gradeLevel: ""}

function NewStudent({ newForm=newStudentForm }) {
    const { students, setStudents } = useContext(UserContext);

    const [form, setForm] = useState(newForm)

    const navigate = useNavigate();

    const onChange = (e) => handleChange(form, setForm, e)

    const { errors, onSubmit } = useHandleSubmit({
        endpoint: '/students',
        method: 'POST',
        form: {
            first_name: form.firstName,
            last_name: form.lastName,
            grade_level: form.gradeLevel
        },
        callback: (student) => {
            setStudents(alphabetize([...students, student]))
            setForm(newStudentForm);
            navigate(`/students/${student.id}`);
        }
    });

    return (
        <>
            <Header>
                <h1>New Student</h1>
            </Header>
            <FormContainer>
                <form onSubmit={onSubmit}>
                    <InputContainer>
                        <InputIcon className='material-icons'>person</InputIcon>
                        <InputField type="text" name="firstName" placeholder="First Name" value={form.firstName} onChange={onChange} />
                        <InputField type="text" name="lastName" placeholder="Last Name" value={form.lastName} onChange={onChange} />
                    </InputContainer>
                    <InputContainer>
                        <InputIcon className='material-icons'>school</InputIcon>
                        <InputField  type="number" name="gradeLevel" placeholder="Grade Level: 1–12" value={form.gradeLevel} onChange={onChange} />
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
    padding: 16px;
    font-family: 'Ubuntu';
    box-sizing: border-box;
    font-size: 1em;
    margin: 1em 0;
    &:focus {
        outline-color: #6a8532;
    }
`

export default NewStudent;