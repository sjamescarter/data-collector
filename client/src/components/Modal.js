import { forwardRef } from "react";
import styled from "styled-components";

const Modal = forwardRef(({ title, children }, ref) => {
    return (
        <Dialog ref={ref}>
            <Title>{title}</Title>
            <Container>
                {children}
            </Container>
        </Dialog>
    );
});

const Dialog = styled.dialog`
    background-color: #6a8532;
    border: none;
    border-radius: 4px;
    box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
    box-sizing: border-box;
    padding: 0;
    text-align: center;
    &::backdrop {
        background-color: black;
        opacity: .5;
    }
`
const Title = styled.h1`
    color: #f8f8f8;
    padding: 0 1em;
`
const Container = styled.div`
    background-color: #d7dace;
    border: none;
    padding: 2em;
    box-sizing: border-box;
    width: 100%;
    margin: 0;
`
export default Modal;