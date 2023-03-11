import {IngredientItem} from "../ingredients-item/ingredients-item";
import styles from "./ingreidients-list.module.css"
import React from "react";
import PropTypes from "prop-types";
import {INGREDIENTS_ARRAY} from "../../../utils/BurgerPropTypes";
export const IngredientsList = React.forwardRef(({header, ingredientsList}, ref) => {
    return (<div ref={ref}>
        <h2 className={styles.ingredientsHeader}>{header}</h2>
        <div className={styles.ingredientsGrid}>
            {
                ingredientsList.map(item => (<IngredientItem key={item._id} item={item} count={1}/>))
            }
        </div>
    </div>);
})

IngredientsList.propTypes = {
    header: PropTypes.string.isRequired,
    ingredientsList: INGREDIENTS_ARRAY
}