import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import Search from "../components/Search";
import StudentList from "../components/StudentList";
import { filter } from '../components/utilities';
import { Header } from '../styles'
import IconButton from '../components/IconButton';

function MyStudents() {
    const { user, students } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const [myStudents, setMyStudents] = useState(true);
    const studentList = myStudents ? user.students : students;
    const filtered = filter(studentList, search);

    const navigate = useNavigate();

    return (
        <>
            <Header>
                <h1>Students</h1>
                <IconButton 
                    onClick={() => navigate(`/students/new`)}
                    icon='person_add_alt_1'
                    text='New Student'
                />
            </Header>
            <div className="flex" style={{width: '250px', justifyContent: 'space-between', margin: 'auto'}}>
                <h4 onClick={() => setMyStudents(true)}>
                    {myStudents
                        ? <Selected>My Students</Selected>
                        : <NotSelected>My Students</NotSelected>
                    }
                </h4>
                <h4 onClick={() => setMyStudents(false)}>
                    {myStudents
                        ? <NotSelected>All Students</NotSelected>
                        : <Selected>All Students</Selected>
                    }
                </h4>
            </div>
            <Search search={search} setSearch={setSearch} />
            <StudentList students={filtered} />
        </>
    );
}

const Selected = styled.span`
    background-color: #d7dace;
    padding: 15px;
    border-radius: 4px;
    box-sizing: border-box;
    &:hover {
        cursor: pointer;
    }
`
const NotSelected = styled(Selected)`
    background-color: inherit;
`
export default MyStudents;