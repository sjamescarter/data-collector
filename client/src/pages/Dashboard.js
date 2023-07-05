import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Dashboard() {
    const navigate = useNavigate();

    return (
        <div>
            <Head>
                <h1>Dashboard</h1>
            </Head>
            <Container>
                <Button onClick={() => navigate('/students')}>
                    <I className="material-icons">groups</I>
                    <Text>My Students</Text>
                </Button>
                <Button onClick={() => navigate('/students/new')}>
                    <I className="material-icons">person_add_alt_1</I>
                    <Text>Add New Student</Text>
                </Button>
                <Button onClick={() => navigate('/goals/new')}>
                    <I className="material-icons">assignment_add</I>
                    <Text>Add New Goal</Text>
                </Button>
            </Container>
        </div>
    )
}

const Head = styled.div`
    align-items: center;
    border-bottom: 1px solid #999;
    display: grid;
    font-size: 1.25em;
    grid-template-columns: 3fr 140px;
    margin: auto;
    padding: 10px;
    width: 80%;
`
const Container = styled.div`
    display: flex;
    grid-template-columns: 1fr 1fr 1fr;
    margin: auto;
    width: 80%
`
const Button = styled.button`
    background-color: #6a8532;
    border: none;
    border-radius: 8px;
    display: block;
    height: 150px;
    margin: 25px;
    width: 150px;
    opacity: .9;
    &:hover {
        opacity: 1;
        cursor: pointer;
    }
`
const I = styled.i`
    font-size: 4em;
    color: white;
    margin: 10px 0 0 0;
`

const Text = styled.h2`
    margin: auto;
`
export default Dashboard;