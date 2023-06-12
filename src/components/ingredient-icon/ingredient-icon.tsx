import {TIngredient} from "../../utils/burger-prop-types";
import styles from "./ingredient-icon.module.css";
import React from "react";

export const IngredientIcon = ({ingredient, extraCount = 0}: { ingredient: TIngredient, extraCount?: number }) => {
    return (
        <>
            <img className={`${styles.circling}`} src={ingredient.image_mobile} alt={ingredient.name}/>
            {extraCount > 0 && (<p className={styles.imageText}>+{extraCount}</p>)}
        </>
    )
}