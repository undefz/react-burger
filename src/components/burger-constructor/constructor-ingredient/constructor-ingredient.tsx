import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./constructor-ingredient.module.css"
import {TIngredient, TIngredientPosition} from "../../../utils/burger-prop-types";
import {useDrag} from "react-dnd";
import {ITEM_TYPES} from "../../../utils/app-config";
import {getBasketName} from "../../../utils/utils";

type TConstructorIngredientProps = {
    ingredient: TIngredient;
    type?: TIngredientPosition;
    extraClass?: string;
    handleClose?: () => void;
}
const ConstructorIngredient = ({ingredient, type, extraClass, handleClose}: TConstructorIngredientProps) => {
    const name = getBasketName(ingredient.name, type);

    const isLocked = type === "top" || type === "bottom";

    const [{isDragging}, dragRef] = useDrag({
        type: ITEM_TYPES.CONSTRUCTOR_CARD,
        item: () => ingredient,
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });

    return (
        <div className={`${styles.constructorIngredient} ${extraClass} ${isDragging ? styles.drag : ''}`}
             ref={dragRef}
             data-testid="constructorElement">
            {!isLocked && <DragIcon type="primary"/>}
            <ConstructorElement text={name} thumbnail={ingredient.image} price={ingredient.price} isLocked={isLocked}
                                type={type} handleClose={handleClose}/>
        </div>
    );

}

export default ConstructorIngredient;