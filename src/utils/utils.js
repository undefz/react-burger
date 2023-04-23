export const calculateCount = (basket, item) => {
    if (item.type === "bun") {
        if (item === basket.bun) {
            return 2;
        }
    }
    return basket.items.filter(e => e._id === item._id).length;
}