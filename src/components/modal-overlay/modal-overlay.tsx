import styles from "./modal-overlay.module.css";
import {ReactElement} from "react";

const ModalOverlay = ({closeModal, children}: {closeModal: Function, children: ReactElement}) => {
    return (
        <div className={styles.overlay} onClick={e => {closeModal(); e.stopPropagation();}}>
            {children}
        </div>
    );
};

export default ModalOverlay;