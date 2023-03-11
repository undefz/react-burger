import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import styles from "./modal.module.css"
import {CHILDREN} from "../../utils/BurgerPropTypes";
import PropTypes from "prop-types";

const modalRoot = document.getElementById("modal-root");

const Modal = ({children, closeModal}) => {
    const handleKeydown = React.useCallback(
        (keydownEvent) => {
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

    return ReactDOM.createPortal(
        (
            <ModalOverlay closeModal={closeModal}>
                <div className={`${styles.modal}`}>
                    {children}

                    <div className={styles.closeButton}>
                        <CloseIcon type="primary" onClick={e => {closeModal(); e.stopPropagation();}}/>
                    </div>
                </div>
            </ModalOverlay>
        ),
        modalRoot
    );
}

Modal.propTypes = {
    children: CHILDREN,
    closeModal: PropTypes.func.isRequired
}

export default Modal;