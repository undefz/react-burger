import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-item.module.css"
import React from "react";
import Modal from "../../modal/modal";
import IngredientDetails from "../../ingredient-details/ingredient-details";

export const IngredientItem = ({item, count}) => {
    const [showModal, setShowModal] = React.useState(false);

    const onItemClick = () => {
        setShowModal(true);
    }
    const onModalClose = () => {
        setShowModal(false);
    }

    return (
        <div className={styles.item} onClick={onItemClick}>
            {
                count > 0 ? <Counter extraClass= {styles.counter} count={count}/> : null
            }

            <img src={item.image} alt={item.name}/>
            <div className={styles.price}>
                <p>{item.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.itemName}>{item.name}</p>

            {showModal && (
                <Modal closeModal={onModalClose}>
                    <IngredientDetails ingredient={item}/>
                </Modal>
            )}
        </div>
    )
}