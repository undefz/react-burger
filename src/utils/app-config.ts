import {TIngredientType} from "./burger-prop-types";

export const BASE_URL = "https://norma.nomoreparties.space/api";

export const TYPE_BUN: TIngredientType = "bun";
export const TYPE_SAUCE: TIngredientType = "sauce";
export const TYPE_MAIN: TIngredientType = "main";
export const INGREDIENT_TYPES: Array<TIngredientType> = [TYPE_BUN, TYPE_SAUCE, TYPE_MAIN];

export const INGREDIENT_NAMES: Record<TIngredientType, string> = {
    [TYPE_BUN]: "Булки",
    [TYPE_SAUCE]: "Соусы",
    [TYPE_MAIN]: "Начинки"
}

export const ITEM_TYPES = {
    INGREDIENT_CARD: 'INGREDIENT_CARD',
    CONSTRUCTOR_CARD: 'CONSTRUCTOR_CARD'
}