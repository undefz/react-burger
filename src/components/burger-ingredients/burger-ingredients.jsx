import React, {useRef, useState} from "react";
import styles from "./burger-ingredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsList} from "./ingredients-list/ingredients-list";

const INGREDIENT_TYPES = {
    "bun": "Булки",
    "sauce": "Соусы",
    "main": "Начинки"
}

export const BurgerIngredients = ({ingredients}) => {
    const [currentTab, setCurrentTab] = useState("bun");

    const typesRefs = {
        "bun": useRef(),
        "sauce": useRef(),
        "main": useRef()
    }

    const onTabClick = tab => {
        setCurrentTab(tab);
        typesRefs[tab]?.current?.scrollIntoView();
    }

    return (
        <>
            <section className={styles.sectionContainer}>
                <h1 className={styles.sectionHeader}>Соберите бургер</h1>
                <div className={styles.tabList}>
                    {
                        Object.entries(INGREDIENT_TYPES).map(([key, value]) =>
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
                        Object.entries(INGREDIENT_TYPES).map(([key, value]) => {
                            var filtered = ingredients
                                .filter(e => e.type === key);
                            return (<IngredientsList key={key} header={value} ingredientsList={filtered} ref={typesRefs[key]}/>);
                        })
                    }
                </div>
            </section>
        </>
    );
}

export default BurgerIngredients;