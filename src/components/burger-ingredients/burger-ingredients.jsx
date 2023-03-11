import React, {useRef, useState} from "react";
import styles from "./burger-ingredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsList} from "./ingredients-list/ingredients-list";
import {INGREDIENT_NAMES} from "../../utils/app-config";
import {INGREDIENTS_ARRAY} from "../../utils/burger-prop-types";

export const BurgerIngredients = ({ingredients, basket}) => {
    const [currentTab, setCurrentTab] = useState("bun");

    const typesRefs = {
        "bun": useRef(),
        "sauce": useRef(),
        "main": useRef()
    }

    const onTabClick = tab => {
        setCurrentTab(tab);
        typesRefs[tab]?.current?.scrollIntoView({behavior: "smooth"});
    }

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.sectionHeader}>Соберите бургер</h1>
            <div className={styles.tabList}>
                {
                    Object.entries(INGREDIENT_NAMES).map(([key, value]) =>
                        <Tab key={key}
                             active={currentTab === key}
                             value={key}
                             onClick={onTabClick}>
                            {value}
                        </Tab>
                    )
                }
            </div>
            <div className={styles.listContainer}>
                {
                    Object.entries(INGREDIENT_NAMES).map(([key, value]) => {
                        const filtered = ingredients
                            .filter(e => e.type === key);
                        return (
                            <IngredientsList key={key} header={value} ingredientsList={filtered} ref={typesRefs[key]}
                                             basket={basket}/>);
                    })
                }
            </div>
        </section>
    );
}

BurgerIngredients.propTypes = {
    ingredients: INGREDIENTS_ARRAY.isRequired,
    basket: INGREDIENTS_ARRAY.isRequired
}

export default BurgerIngredients;