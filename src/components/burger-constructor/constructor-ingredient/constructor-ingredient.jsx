import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./constructor-ingredient.module.css"
import PropTypes from "prop-types";
import {INGREDIENT} from "../../../utils/burger-prop-types";
import {useDrag} from "react-dnd";
import {ITEM_TYPES} from "../../../utils/app-config";


const basketName = (name, type) => {
    if (type === "top") {
        return name + " (верх)";
    }
    if (type === "bottom") {
        return name + " (низ)";
    }
    return name;
}
const ConstructorIngredient = ({ingredient, type, extraClass, handleClose}) => {
    const name = basketName(ingredient.name, type);

    const isLocked = type === "top" || type === "bottom";

    const [{ isDragging }, dragRef] = useDrag({
        type: ITEM_TYPES.CONSTRUCTOR_CARD,
        item: () => ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className={`${styles.constructorIngredient} ${extraClass} ${isDragging ? styles.drag : ''}`} ref={dragRef}>
            {!isLocked && <DragIcon type="primary"/>}
            <ConstructorElement text={name} thumbnail={ingredient.image} price={ingredient.price} isLocked={isLocked}
                                type={type} handleClose={handleClose}/>
        </div>
        );

}

ConstructorIngredient.propTypes = {
    ingredient: INGREDIENT.isRequired,
    type: PropTypes.oneOf(["top", "bottom"]),
    extraClass: PropTypes.string
}

export default ConstructorIngredient;