import React from "react";
import styles from "./burger-twopanels.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {INGREDIENTS_ARRAY} from "../../utils/BurgerPropTypes";

export const BurgerTwopanels = ({ingredients}) => {
    return (
        <>
            <main className={styles.twoContainer}>
                <BurgerIngredients ingredients={ingredients}/>
                <BurgerConstructor ingredients={ingredients}/>
            </main>
        </>
    )
}

BurgerTwopanels.propTypes = {
    ingredients: INGREDIENTS_ARRAY.isRequired
}

export default BurgerTwopanels;