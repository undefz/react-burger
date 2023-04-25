import {IngredientItem} from "../ingredients-item/ingredients-item";
import styles from "./ingreidients-list.module.css"
import React, {useMemo} from "react";
import PropTypes from "prop-types";
import {INGREDIENTS_ARRAY} from "../../../utils/burger-prop-types";
import {calculateCount} from "../../../utils/utils";
import {useSelector} from "react-redux";
export const IngredientsList = React.forwardRef(({header, ingredientsList}, ref) => {
    const basket = useSelector(state => state.basket);

    const ingredientCount = useMemo(() => {
        return ingredientsList.map(item => [item, calculateCount(basket, item)])
    }, [basket, ingredientsList]);

    return (<div ref={ref}>
        <h2 className={styles.ingredientsHeader}>{header}</h2>
        <div className={styles.ingredientsGrid}>
            {
                ingredientCount.map(([item, count]) => (<IngredientItem key={item._id} item={item} count={count}/>))
            }
        </div>
    </div>);
})

IngredientsList.propTypes = {
    header: PropTypes.string.isRequired,
    ingredientsList: INGREDIENTS_ARRAY.isRequired
}