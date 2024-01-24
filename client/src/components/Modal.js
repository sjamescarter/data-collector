import { forwardRef } from "react";
import styled from "styled-components";

const Modal = forwardRef(({ children }, ref) => {
    return (
        <Dialog ref={ref}>
            {children}
        </Dialog>
    );
});

const Dialog = styled.dialog`
    background-color: #d7dace;
    text-align: center;
    border: none;
    border-radius: 4px;
    box-sizing: border-box;
    padding: 2em;
    box-shadow: 0 5px 16.83px 0.17px rgba(0, 0, 0, 0.25);
    &::backdrop {
        background-color: black;
        opacity: .5;
    }
`
export default Modal;