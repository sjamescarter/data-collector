import styled from "styled-components";

function Warn({ handleDelete, closeModal}) {
    return (
        <div>
            <h1>Are you sure?</h1>
            <Container>
                <Delete onClick={handleDelete}>Delete</Delete>
                <Cancel onClick={closeModal}>Cancel</Cancel>
            </Container>
        </div>
    );
}

const Container = styled.div`
    display: flex;
    justify-content: space-evenly;
`
const Delete = styled.button`
    border: none;
    border-radius: 4px;
    background-color: #6a8532;
    color: #f8f8f8;
    font-weight: bold;
    font-size: 1em;
    padding: 16px;
    &:hover {
        cursor: pointer;
        background-color: #eb5e28;
    }
`
const Cancel = styled(Delete)`
    color: #6a8532;
    background-color: #f8f8f8;
    &:hover {
        background-color: #f8f8f8;
    }
`
export default Warn;