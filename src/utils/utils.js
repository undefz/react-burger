import {TYPE_BUN} from "./app-config";

export const getBasketName = (name, type) => {
    if (type === "top") {
        return name + " (верх)";
    }
    if (type === "bottom") {
        return name + " (низ)";
    }
    return name;
}
export const calculateCount = (basket, item) => {
    if (item.type === TYPE_BUN) {
        if (item === basket.bun) {
            return 2;
        }
    }
    return basket.items.filter(e => e._id === item._id).length;
}