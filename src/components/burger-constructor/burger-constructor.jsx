import React, {useState} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ITEM_TYPES} from "../../utils/app-config";
import {addIngredient, removeIngredient, selectBun} from "../../services/reducers/burger-constructor";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const basket = useSelector(state => state.basket.items);
    const bun = useSelector(state => state.basket.bun);

    const [showModal, setShowModal] = useState(false);

    const onButtonClick = () => {
        setShowModal(true);
    }
    const onModalClose = () => {
        setShowModal(false);
    }

    const total = basket.map(e => e.price).reduce((a, b) => a + b, 0) + (bun ? bun.price * 2 : 0);

    const [, dropTargetRef] = useDrop({
        accept: ITEM_TYPES.INGREDIENT_CARD,
        drop(item) {
            handleDrop(item);
        },
    });

    const handleDrop = (item) => {
        const { _id, type } = item;

        switch (type) {
            case "bun": {
                dispatch(selectBun(item));
                break;
            }
            default: {
                dispatch(addIngredient(item));
                break;
            }
        }
    }

    const handleClose = (uuid) => {
        dispatch(removeIngredient(uuid))
    }

    return (
        <div className="mt-25" ref={dropTargetRef}>
            <section className={`${styles.mainConstructor}`}>
                { bun && <ConstructorIngredient ingredient={bun} type="top" extraClass="ml-8"/> }
                <div className={styles.scrollable}>
                    {
                        basket.map(e => (
                            <ConstructorIngredient key={e.uuid} ingredient={e} handleClose={() => handleClose(e.uuid)}/>))
                    }
                </div>
                { bun && <ConstructorIngredient ingredient={bun} type="bottom" extraClass="ml-8"/> }
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
}

export default BurgerConstructor;