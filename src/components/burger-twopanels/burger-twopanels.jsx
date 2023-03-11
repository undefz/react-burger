import React from "react";
import styles from "./burger-twopanels.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";

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

export default BurgerTwopanels;