import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-item.module.css"
import React from "react";
import {INGREDIENT} from "../../../utils/burger-prop-types";
import PropTypes from "prop-types";
import {useDrag} from "react-dnd";
import {ITEM_TYPES} from "../../../utils/app-config";
import {useNavigate} from "react-router-dom";

export const IngredientItem = ({item, count}) => {
    const navigate = useNavigate();

    const [, dragRef] = useDrag({
        type: ITEM_TYPES.INGREDIENT_CARD,
        item: item,
    });

    const onItemClick = () => {
        navigate(`/ingredients/${item._id}`, {state: {modal: true}})
    }

    return (
        <div className={styles.item} onClick={onItemClick} ref={dragRef}>
            {
                count > 0 ? <Counter extraClass= {styles.counter} count={count}/> : null
            }

            <img src={item.image} alt={item.name}/>
            <div className={styles.price}>
                <p>{item.price}</p>
                <CurrencyIcon type="primary"/>
            </div>
            <p className={styles.itemName}>{item.name}</p>
        </div>
    )
}

IngredientItem.propTypes = {
    item: INGREDIENT.isRequired,
    count: PropTypes.number.isRequired
}