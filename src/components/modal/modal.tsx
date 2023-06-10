import React, {ReactElement} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"

const modalRoot = document.getElementById("modal-root");

type TModalProps = {
    children: ReactElement;
    closeModal: (arg?: unknown) => void;
}
const Modal = ({children, closeModal}: TModalProps) => {
    const handleKeydown = React.useCallback(
        (keydownEvent: KeyboardEvent) => {
            if (keydownEvent.key === "Escape") {
                closeModal();
            }
        },
        [closeModal]
    );

    React.useEffect(() => {
        document.addEventListener("keydown", handleKeydown);
        return () => document.removeEventListener("keydown", handleKeydown);
    }, [closeModal, handleKeydown]);

    if (!modalRoot) {
        throw new Error("No modal root found")
    }

    return ReactDOM.createPortal(
        (
            <ModalOverlay closeModal={closeModal}>
                <div className={`${styles.modal}`} onClick={e => e.stopPropagation()}>
                    {children}

                    <div className={styles.closeButton}>
                        <CloseIcon type="primary" onClick={closeModal}/>
                    </div>
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
}

export default Modal;