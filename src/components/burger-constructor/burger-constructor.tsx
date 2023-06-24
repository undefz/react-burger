import React, {useMemo, useRef} from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";
import OrderResult from "../order-result/order-result";
import Modal from "../modal/modal";
import {DropTargetMonitor, useDrop} from "react-dnd";
import {ITEM_TYPES, TYPE_BUN} from "../../utils/app-config";
import {addIngredient, moveIngredient, removeIngredient, selectBun} from "../../services/reducers/burger-constructor";
import {makeOrder} from "../../services/actions/order-details";
import {closeModal} from "../../services/reducers/order-details";
import {useNavigate} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../services/hooks";
import {TIngredient} from "../../utils/burger-prop-types";

export const BurgerConstructor = () => {
    const dispatch = useAppDispatch();

    const basket = useAppSelector(state => state.basket.items);
    const bun = useAppSelector(state => state.basket.bun);
    const user = useAppSelector(state => state.user);
    const navigate = useNavigate();

    const orderDetails = useAppSelector(state => state.orderDetails);

    const onButtonClick = () => {
        console.log(`USER ${JSON.stringify(user)}`)
        if (user?.isAuthed) {
            const orderIds = basket.map(x => x._id);
            if (bun) {
                orderIds.push(bun._id);
                orderIds.push(bun._id);
            }

            dispatch(makeOrder(orderIds))
        } else {
            navigate('/login');
        }
    }
    const onModalClose = () => {
        dispatch(closeModal())
    }

    const total = useMemo(() => {
        return basket.map(e => e.price).reduce((a, b) => a + b, 0) + (bun ? bun.price * 2 : 0);
    }, [basket, bun]);

    const [, dropTargetRef] = useDrop<TIngredient>({
        accept: [ITEM_TYPES.INGREDIENT_CARD, ITEM_TYPES.CONSTRUCTOR_CARD],
        drop(item, monitor) {
            if (monitor.getItemType() === ITEM_TYPES.INGREDIENT_CARD) {
                handleDropIngredient(item);
            } else {
                handleDropConstructor(item, monitor);
            }
        },
    });

    const handleDropIngredient = (item: TIngredient) => {
        const {type} = item;

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

    const ingredientsRef = useRef<HTMLDivElement>(null);
    const handleDropConstructor = (item: TIngredient, monitor: DropTargetMonitor) => {
        const differenceFromInitialOffset = monitor.getDifferenceFromInitialOffset();
        const initialSourceClientOffset = monitor.getInitialSourceClientOffset();
        const sourceClientOffset = monitor.getSourceClientOffset();

        const current = ingredientsRef.current;

        if (differenceFromInitialOffset && initialSourceClientOffset && sourceClientOffset && current) {
            const sign = Math.sign(differenceFromInitialOffset.y);
            if (sign !== 0) {
                let shift = 0;

                const fromY = initialSourceClientOffset.y * sign;
                const toY = sourceClientOffset.y * sign;

                for (const element of current.children) {
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
    }

    const handleClose = (uuid?: string) => {
        if (uuid) {
            dispatch(removeIngredient(uuid))
        }
    }

    return (
        <div className="mt-25" ref={dropTargetRef} data-testid="burgerConstructor">
            <section className={`${styles.mainConstructor}`}>
                {bun && <ConstructorIngredient ingredient={bun} type="top" extraClass="ml-8"/>}
                <div className={styles.scrollable} ref={ingredientsRef}>
                    {
                        basket.map(e => (
                            <ConstructorIngredient key={e.uuid} ingredient={e}
                                                   handleClose={() => handleClose(e.uuid)}/>))
                    }
                </div>
                {bun && <ConstructorIngredient ingredient={bun} type="bottom" extraClass="ml-8"/>}
            </section>
            <div className={`${styles.orderBlock} mt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{total}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large" onClick={onButtonClick} data-testid="orderButton">Оформить заказ</Button>
            </div>
            {
                orderDetails.orderId && (
                    <Modal closeModal={onModalClose}>
                        <OrderResult/>
                    </Modal>
                )
            }
        </div>

    )
}

export default BurgerConstructor;