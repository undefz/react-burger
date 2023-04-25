import React, {useMemo, useRef } from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDispatch, useSelector} from "react-redux";
import {useDrop} from "react-dnd";
import {ITEM_TYPES, TYPE_BUN} from "../../utils/app-config";
import {addIngredient, moveIngredient, removeIngredient, selectBun} from "../../services/reducers/burger-constructor";
import {makeOrder} from "../../services/actions/order-details";
import {closeModal} from "../../services/reducers/order-details";

export const BurgerConstructor = () => {
    const dispatch = useDispatch();

    const basket = useSelector(state => state.basket.items);
    const bun = useSelector(state => state.basket.bun);

    const orderDetails = useSelector(state => state.orderDetails);

    const onButtonClick = () => {
        const orderIds = basket.map(x => x._id);
        if (bun) {
            orderIds.push(bun._id);
            orderIds.push(bun._id);
        }

        dispatch(makeOrder(orderIds))
    }
    const onModalClose = () => {
        dispatch(closeModal())
    }

    const total = useMemo(() => {
        return basket.map(e => e.price).reduce((a, b) => a + b, 0) + (bun ? bun.price * 2 : 0);
    }, [basket, bun]);

    const [, dropTargetRef] = useDrop({
        accept: [ITEM_TYPES.INGREDIENT_CARD, ITEM_TYPES.CONSTRUCTOR_CARD],
        drop(item, monitor) {
            if (monitor.getItemType() === ITEM_TYPES.INGREDIENT_CARD) {
                handleDropIngredient(item);
            } else {
                handleDropConstructor(item, monitor);
            }
        },
    });

    const handleDropIngredient = (item) => {
        const { type } = item;

        switch (type) {
            case TYPE_BUN: {
                dispatch(selectBun(item));
                break;
            }
            default: {
                dispatch(addIngredient(item));
                break;
            }
        }
    }

    const ingredientsRef = useRef();
    const handleDropConstructor = (item, monitor) => {
        const sign = Math.sign(monitor.getDifferenceFromInitialOffset().y);
        if (sign !== 0) {
            let shift = 0;

            const fromY = monitor.getInitialSourceClientOffset().y * sign;
            const toY = monitor.getSourceClientOffset().y * sign;

            for (const element of ingredientsRef.current.children) {
                const y = element.getBoundingClientRect().y * sign;
                if (y > fromY && y < toY) {
                    shift += sign;
                }
            }

            if (shift !== 0) {
                dispatch(moveIngredient({item, shift}));
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
                <div className={styles.scrollable} ref={ingredientsRef}>
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
                orderDetails.orderId && (
                    <Modal closeModal={onModalClose}>
                        <OrderDetails/>
                    </Modal>
                )
            }
        </div>

    )
}

export default BurgerConstructor;