import React from "react";
import styles from "./burger-twopanels.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {INGREDIENTS_ARRAY} from "../../utils/burger-prop-types";

export const BurgerTwopanels = ({ingredients, basket}) => {
    return (
        <>
            <main className={styles.twoContainer}>
                <BurgerIngredients ingredients={ingredients} basket={basket}/>
                <BurgerConstructor basket={basket}/>
            </main>
        </>
    )
}

BurgerTwopanels.propTypes = {
    ingredients: INGREDIENTS_ARRAY.isRequired,
    basket: INGREDIENTS_ARRAY.isRequired,
}

export default BurgerTwopanels;