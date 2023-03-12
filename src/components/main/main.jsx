import React from "react";
import styles from "./main.module.css"
import BurgerIngredients from "../burger-ingredients/burger-ingredients";
import BurgerConstructor from "../burger-constructor/burger-constructor";
import {INGREDIENTS_ARRAY} from "../../utils/burger-prop-types";

export const Main = ({ingredients, basket}) => {
    return (
        <main className={styles.main}>
            <BurgerIngredients ingredients={ingredients} basket={basket}/>
            <BurgerConstructor basket={basket}/>
        </main>
    )
}

Main.propTypes = {
    ingredients: INGREDIENTS_ARRAY.isRequired,
    basket: INGREDIENTS_ARRAY.isRequired,
}

export default Main;