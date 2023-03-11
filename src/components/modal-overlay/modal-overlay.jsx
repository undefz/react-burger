import styles from "./modal-overlay.module.css";

const ModalOverlay = ({closeModal, children}) => {
    return (
        <div className={styles.overlay} onClick={closeModal}>
            {children}
        </div>
    );
};

export default ModalOverlay;