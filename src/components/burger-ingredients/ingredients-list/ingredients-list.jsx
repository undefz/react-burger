import {IngredientItem} from "../ingredients-item/ingredients-item";
import styles from "./ingreidients-list.module.css"
import React from "react";
import PropTypes from "prop-types";
import {INGREDIENTS_ARRAY} from "../../../utils/burger-prop-types";
import {calculateCount} from "../../../utils/utils";
import {useSelector} from "react-redux";
export const IngredientsList = React.forwardRef(({header, ingredientsList}, ref) => {
    const basket = useSelector(state => state.basket);

    return (<div ref={ref}>
        <h2 className={styles.ingredientsHeader}>{header}</h2>
        <div className={styles.ingredientsGrid}>
            {
                ingredientsList.map(item => (<IngredientItem key={item._id} item={item} count={calculateCount(basket, item)}/>))
            }
        </div>
    </div>);
})

IngredientsList.propTypes = {
    header: PropTypes.string.isRequired,
    ingredientsList: INGREDIENTS_ARRAY
}