import {IngredientItem} from "../ingredients-item/ingredients-item";
import styles from "./ingreidients-list.module.css"
import React, {useMemo} from "react";
import {TIngredient} from "../../../utils/burger-prop-types";
import {calculateCount} from "../../../utils/utils";
import {useAppSelector} from "../../../services/hooks";

type TIngredientsListProps = {
    header: string;
    ingredientsList: Array<TIngredient>;
}

export const IngredientsList = React.forwardRef<HTMLDivElement, TIngredientsListProps>(({header, ingredientsList}, ref) => {
    const basket = useAppSelector(state => state.basket);

    const ingredientCount = useMemo(() => {
        return ingredientsList.map<[TIngredient, number]>(item => [item, calculateCount(basket, item)])
    }, [basket, ingredientsList]);

    return (<div ref={ref}>
        <h2 className={styles.ingredientsHeader}>{header}</h2>
        <div className={styles.ingredientsGrid} data-testid="ingredients-list">
            {
                ingredientCount.map(([item, count]) => (<IngredientItem key={item._id} item={item} count={count}/>))
            }
        </div>
    </div>);
})
