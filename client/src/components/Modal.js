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
    background-color: #d7dace
    &::backdrop {
        // color: black;
        // opacity: .9;
    }
`
export default Modal;