import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import Search from "../components/Search";
import StudentList from "../components/StudentList";
import { filter } from '../components/utilities';
import { Header, Li } from '../styles'

function MyStudents() {
    const { user } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const filtered = filter(user.students, search);

    const navigate = useNavigate();

    return (
        <div>
            <Header style={{gridTemplateColumns: '3fr 145px'}}>
                <h1>My Students</h1>
                <Button onClick={() => navigate(`/students/new`)}>
                    <i 
                        style={{padding: '0 6px'}}
                        className="material-icons" 
                        >
                        person_add_alt_1
                    </i>
                    <p style={{padding: '0 6px 0 0'}}>Create Student</p>
                </Button>
            </Header>
            {<Search search={search} setSearch={setSearch}>
                {search 
                    ? <ul>
                        <Li onClick={() => navigate(`/goals/new`)}>
                            Can't find a student? Click here to add an existing student to your caseload.
                        </Li> 
                    </ul>
                    : null
                }
            </Search>}
            {<StudentList students={filtered} />}
        </div>
    );
}

const Button = styled.button`
    align-items: center;
    background-color: #6a8532;
    border: 2px solid #6a8532;
    border-radius: 8px;
    color: white;
    display: flex;
    padding: 4px;
    opacity: .9;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`
export default MyStudents;