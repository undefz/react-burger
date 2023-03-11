import React, {useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {INGREDIENTS_ARRAY} from "../../utils/burger-prop-types";

export const BurgerConstructor = ({basket}) => {
    const [showModal, setShowModal] = useState(false);

    const onButtonClick = () => {
        setShowModal(true);
    }
    const onModalClose = () => {
        setShowModal(false);
    }

    const bun = basket.filter(e => e.type === "bun")[0];
    const otherIngredients = basket.filter(e => e.type !== "bun")
    const total = basket.map(e => e.price).reduce((a, b) => a + b, 0);

    return (
        <div className="mt-25">
            <section className={`${styles.mainConstructor}`}>
                <ConstructorIngredient ingredient={bun} type="top"/>
                {
                    otherIngredients.map(e => (<ConstructorIngredient key={e._id} ingredient={e}/>))
                }
                <ConstructorIngredient ingredient={bun} type="bottom"/>
            </section>
            <div className={`${styles.orderBlock} mt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{total}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={onButtonClick}>Оформить заказ</Button>
            </div>
            {
                showModal && (
                    <Modal closeModal={onModalClose}>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </div>

    )
}

BurgerConstructor.propTypes = {
    basket: INGREDIENTS_ARRAY.isRequired
}

export default BurgerConstructor;