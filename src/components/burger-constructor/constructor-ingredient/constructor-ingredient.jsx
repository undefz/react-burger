import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./constructor-ingredient.module.css"


const ConstructorIngredient = ({ingredient, type}) => {
    let name = ingredient.name;
    if (type === "top") {
        name += " (верх)";
    }
    if (type === "bottom") {
        name += " (низ)";
    }

    const isLocked = type === "top" || type === "bottom";

    return (
        <div className={styles.constructorIngredient}>
            {!isLocked && <DragIcon type="primary"/>}
            <ConstructorElement text={name} thumbnail={ingredient.image} price={ingredient.price} isLocked={isLocked} type={type}/>
        </div>

        );

}

export default ConstructorIngredient;