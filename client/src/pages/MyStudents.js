import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/user';
import styled from 'styled-components';
import Search from "../components/Search";
import StudentList from "../components/StudentList";
import { filter } from '../components/utilities';

function MyStudents() {
    const { students } = useContext(UserContext);
    const [search, setSearch] = useState("");
    const filtered = filter(students, search);

    const navigate = useNavigate();

    return (
        <div>
            <Head>
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
            </Head>
            {<Search search={search} setSearch={setSearch}>
                {search 
                    ? <ul>
                        <li onClick={() => navigate(`/goals/new`)}>
                            Can't find a student? Click here to add an existing student to your caseload.
                        </li> 
                    </ul>
                    : null
                }
            </Search>}
            {<StudentList students={filtered} />}
        </div>
    );
}

const Head = styled.div`
    align-items: center;
    border-bottom: 1px solid #999;
    display: grid;
    font-size: 1.25em;
    grid-template-columns: 3fr 145px;
    margin: auto;
    padding: 10px;
    width: 80%;
`
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