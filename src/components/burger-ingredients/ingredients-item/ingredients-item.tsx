import {Counter, CurrencyIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./ingredients-item.module.css"
import React from "react";
import {useDrag} from "react-dnd";
import {ITEM_TYPES} from "../../../utils/app-config";
import {useNavigate} from "react-router-dom";
import {useLocation} from "react-router";
import {TIngredient} from "../../../utils/burger-prop-types";

type TIngredientItemProps = {
    item: TIngredient;
    count: number;
}
export const IngredientItem = ({item, count}: TIngredientItemProps) => {
    const navigate = useNavigate();
    const location = useLocation();

    const [{isDragging}, dragRef] = useDrag({
        type: ITEM_TYPES.INGREDIENT_CARD,
        item: item,
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });

    const onItemClick = () => {
        navigate(`/ingredients/${item._id}`, {state: {backgroundLocation: location}})
    }

    return (
        <div className={`${styles.item} ${isDragging ? styles.drag : ''}`} onClick={onItemClick} ref={dragRef}>
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
