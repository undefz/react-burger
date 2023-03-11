import styles from "./modal-overlay.module.css";
import {CHILDREN} from "../../utils/burger-prop-types";
import PropTypes from "prop-types";

const ModalOverlay = ({closeModal, children}) => {
    return (
        <div className={styles.overlay} onClick={e => {closeModal(); e.stopPropagation();}}>
            {children}
        </div>
    );
};

ModalOverlay.propTypes = {
    children: CHILDREN,
    closeModal: PropTypes.func.isRequired
}

export default ModalOverlay;