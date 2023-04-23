import React, {useMemo, useRef, useState} from "react";
import styles from "./burger-ingredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsList} from "./ingredients-list/ingredients-list";
import {INGREDIENT_NAMES, INGREDIENT_TYPES, TYPE_BUN, TYPE_MAIN, TYPE_SAUCE} from "../../utils/app-config";
import {useSelector} from "react-redux";

export const BurgerIngredients = () => {
    const ingredients = useSelector(state => state.ingredients.items);

    const [currentTab, setCurrentTab] = useState(TYPE_BUN);

    const typesRefs = {
        [TYPE_BUN]: useRef(),
        [TYPE_SAUCE]: useRef(),
        [TYPE_MAIN]: useRef()
    }

    const onTabClick = tab => {
        setCurrentTab(tab);
        typesRefs[tab]?.current?.scrollIntoView({behavior: "smooth"});
    }

    const handleScroll = (e) => {
        const scrollTop = e.target.scrollTop;

        Object.entries(typesRefs).forEach(([key, value]) => {
            const tabTop = value.current.getBoundingClientRect().top;

            if (scrollTop > tabTop) {
                setCurrentTab(key);
            }
        })
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
            <div className={styles.listContainer} onScroll={handleScroll}>
                {
                    Object.entries(INGREDIENT_NAMES).map(([key, value]) => {
                        const filtered = ingredients.filter(e => e.type === key);
                        return (
                            <IngredientsList key={key} header={value} ingredientsList={filtered} ref={typesRefs[key]}/>);
                    })
                }
            </div>
        </section>
    );
}

export default BurgerIngredients;