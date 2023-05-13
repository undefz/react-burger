export const BASE_URL = "https://norma.nomoreparties.space/api";
export const INGREDIENTS_URL = BASE_URL + "/api/ingredients";
export const ORDER_URL = BASE_URL + "/api/orders";

export const TYPE_BUN = "bun";
export const TYPE_SAUCE = "sauce";
export const TYPE_MAIN = "main";
export const INGREDIENT_TYPES = [TYPE_BUN, TYPE_SAUCE, TYPE_MAIN];

export const INGREDIENT_NAMES = {
    [TYPE_BUN]: "Булки",
    [TYPE_SAUCE]: "Соусы",
    [TYPE_MAIN]: "Начинки"
}

export const ITEM_TYPES = {
    INGREDIENT_CARD: 'INGREDIENT_CARD',
    CONSTRUCTOR_CARD: 'CONSTRUCTOR_CARD'
}