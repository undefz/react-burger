import React, {RefObject, useMemo, useRef, useState} from "react";
import styles from "./burger-ingredients.module.css"
import {Tab} from "@ya.praktikum/react-developer-burger-ui-components";
import {IngredientsList} from "./ingredients-list/ingredients-list";
import {INGREDIENT_NAMES, INGREDIENT_TYPES, TYPE_BUN} from "../../utils/app-config";
import {useAppSelector} from "../../services/hooks";
import {TIngredient, TIngredientType} from "../../utils/burger-prop-types";

export const BurgerIngredients = () => {
    const ingredients = useAppSelector(state => state.ingredients.items);

    const [currentTab, setCurrentTab] = useState<TIngredientType>(TYPE_BUN);

    const typesRefs: Record<TIngredientType, RefObject<HTMLDivElement>> = {
        "bun": useRef<HTMLDivElement>(null),
        "sauce": useRef<HTMLDivElement>(null),
        "main": useRef<HTMLDivElement>(null),
    }

    const onTabClick = (key: TIngredientType) => {
        setCurrentTab(key);
        typesRefs[key]?.current?.scrollIntoView({behavior: "smooth"});
    }

    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
        const scrollTop = e.currentTarget.scrollTop;

        INGREDIENT_TYPES.forEach(key => {
            const ref = typesRefs[key];
            if (ref.current) {
                const tabTop = ref.current.getBoundingClientRect().top;

                if (scrollTop > tabTop) {
                    setCurrentTab(key);
                }
            }
        })
    }

    const ingredientsByType = useMemo(() => {
        const result: Partial<Record<TIngredientType, Array<TIngredient>>> = {}
        INGREDIENT_TYPES.forEach(key => {
            result[key] = ingredients.filter(e => e.type === key);
        })
        return result as Record<TIngredientType, Array<TIngredient>>;
    }, [ingredients]);

    return (
        <section className={styles.sectionContainer}>
            <h1 className={styles.sectionHeader}>Соберите бургер</h1>
            <div className={styles.tabList}>
                {
                    INGREDIENT_TYPES.map((key) => {
                            const value = INGREDIENT_NAMES[key];
                            return <Tab key={key}
                                        active={currentTab === key}
                                        value={key}
                                        onClick={() => onTabClick(key)}>
                                {value}
                            </Tab>;
                        }
                    )
                }
            </div>
            <div className={styles.listContainer} onScroll={handleScroll}>
                {
                    INGREDIENT_TYPES.map((key) => {
                        const filtered = ingredientsByType[key];
                        const value = INGREDIENT_NAMES[key];
                        return (
                            <IngredientsList key={key} header={value} ingredientsList={filtered}
                                             ref={typesRefs[key]}/>);
                    })
                }
            </div>
        </section>
    );
}

export default BurgerIngredients;