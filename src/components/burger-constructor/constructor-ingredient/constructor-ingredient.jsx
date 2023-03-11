import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./constructor-ingredient.module.css"


const ConstructorIngredient = ({ingredient, type}) => {
    return (
        <div className={styles.constructorIngredient}>
            <DragIcon type="primary"/>
            <ConstructorElement text={ingredient.name} thumbnail={ingredient.image} price={ingredient.price} isLocked={type === "top" || type === "bottom"}/>
        </div>

        );

}

export default ConstructorIngredient;