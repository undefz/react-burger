import {configureStore} from "@reduxjs/toolkit";
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {ingredientsSlice} from "./reducers/burger-ingredients";
import {constructorSlice} from "./reducers/burger-constructor";
import {orderDetailsSlice} from "./reducers/order-details";
import {userSlice} from "./reducers/user";

const rootReducer = {
    ingredients: ingredientsSlice.reducer,
    basket: constructorSlice.reducer,
    orderDetails: orderDetailsSlice.reducer,
    user: userSlice.reducer
}

export const store = configureStore({
    reducer: rootReducer,
    middleware: [thunk, logger],
    devTools: process.env.NODE_ENV !== 'production'
})