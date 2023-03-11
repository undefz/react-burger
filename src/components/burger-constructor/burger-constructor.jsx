import React from "react";
import styles from "./burger-constructor.module.css";
import {Button, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ConstructorIngredient from "./constructor-ingredient/constructor-ingredient";

export const BurgerConstructor = ({ingredients}) => {
    const bun = ingredients.filter(e => e.type === "bun")[0];

    console.log("BUN " + bun);

    let total = 500;

    let otherIngredients = ingredients.filter(e => e.type !== "bun")

    return (
        <div className="mt-25">
            <section className={`${styles.mainConstructor}`}>
                <ConstructorIngredient ingredient={bun} type="top"/>
                {
                    otherIngredients.map(e => (<ConstructorIngredient ingredient={e}/>))
                }
                <ConstructorIngredient ingredient={bun} type="bottom"/>
            </section>
            <div className={`${styles.orderBlock} mt-10`}>
                <div className={styles.price}>
                    <p className="text text_type_digits-medium">{total}</p>
                    <CurrencyIcon type="primary"/>
                </div>
                <Button htmlType="button" type="primary" size="large">Оформить заказ</Button>
            </div>
        </div>
    )
}

export default BurgerConstructor;