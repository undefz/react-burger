import {TYPE_BUN} from "./app-config";
import {TBasket, TIngredient, TIngredientPosition} from "./burger-prop-types";

export const getBasketName = (name: string, type?: TIngredientPosition) => {
    if (type === "top") {
        return name + " (верх)";
    }
    if (type === "bottom") {
        return name + " (низ)";
    }
    return name;
}
export const calculateCount = (basket: TBasket, item: TIngredient) => {
    if (item.type === TYPE_BUN) {
        if (item === basket.bun) {
            return 2;
        }
    }
    return basket.items.filter(e => e._id === item._id).length;
}

export const getStatusName = (name: string):string => {
    if (name === 'created') {
        return 'Создан'
    }
    if (name === 'pending') {
        return 'Готовится'
    }
    if (name === 'done') {
        return 'Готов'
    }
    return ''
}