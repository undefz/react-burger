import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {ingredientsSlice} from "./reducers/burger-ingredients";
import {constructorSlice} from "./reducers/burger-constructor";
import {orderDetailsSlice} from "./reducers/order-details";
import {ingredientDetailsSlice} from "./reducers/ingredient-details";

const rootReducer = {
    ingredients: ingredientsSlice.reducer,
    basket: constructorSlice.reducer,
    ingredientDetails: ingredientDetailsSlice.reducer,
    orderDetails: orderDetailsSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, logger],
    devTools: process.env.NODE_ENV !== 'production'
})