import { forwardRef } from "react";
import styled from "styled-components";

const Modal = forwardRef(({ id, children }, ref) => {
    return (
        <Dialog id={id} ref={ref}>
            {children}
        </Dialog>
    );
});

const Dialog = styled.dialog`
    background-color: #d7dace;
    text-align: center;
    border: none;
    border-radius: 4px;
    padding: 2em;
    &::backdrop {
        background-color: black;
        opacity: .5;
    }
`
export default Modal;