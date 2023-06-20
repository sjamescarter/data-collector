import styled from "styled-components";

function Student({ student }) {

    return (
        <Div>
            <Circle>{student.initial}</Circle>
            <p>{student.name}</p>
            <p>Grade: {student.grade_level}</p>
            <i className="material-icons">assignment_add</i>
        </Div>
    );
}

const Div = styled.div`
    background-color: #d7dace;
    display: grid;
    grid-template-columns: 1fr 3fr 1fr 5%;
    align-items: center;
    width: 80%;
    padding: .25em 1.2em;
    font-size: 1.25em;
    margin: auto;
    margin-top: .5em;
    opacity: .9;
    &:hover {
        opacity: 1;
    }
`
const Circle = styled.div`
    background-color: #6a8532;
    color: #f8f8f8;
    font-size: 32px;
    font-weight: bold;
    text-align: center;
    border-radius: 40px;
    width: 40px;
    height: 40px;
    margin-right: 1em;
`
export default Student;