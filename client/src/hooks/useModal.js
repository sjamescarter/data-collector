import { useRef } from "react";

function useModal() {
    const modal = useRef(null);
    const open = () => modal.current.showModal();
    const close = () => modal.current.close();

    const props = {
        ref: modal,
        open: open,
        close: close
    }

    return props;
}

export default useModal;