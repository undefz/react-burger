export type TIngredientType = 'bun' | 'sauce' | 'main';

export type TIngredient = {
    _id: string;
    name: string;
    type: TIngredientType;
    proteins: number;
    fat: number;
    carbohydrates: number;
    calories: number;
    image: string;
    image_mobile: string;
    image_large: string;
    price: number;

    uuid?: string;
}

export type TBasket = {
    items: Array<TIngredient>;
    bun: TIngredient|null;
}

export type TIngredientPosition = 'top' | 'bottom';

export type TProfileData = {
    name: string;
    email: string;
    password?: string;
}

export type TOrder = {
    ingredients: Array<string>;
    _id: string;
    name: string;
    status: string;
    number: number;
    createdAt: string;
    updatedAt: string;
}

export type TOrderList = {
    orders: Array<TOrder>;
}