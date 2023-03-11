
export const generateBasket = (ingredients) => {
    const bun = ingredients.filter(e => e.type === "bun")[0];

    const other = ingredients.filter(e => {
        if (e.type === "bun") {
            return false;
        }
        return Math.random() > 0.5;
    });

    return [bun, ...other, bun];
}

export const calculateCount = (basket, item) => {
    return basket.filter(e => e._id === item._id).length;
}