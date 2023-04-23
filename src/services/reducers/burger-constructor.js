import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import {generateBasket} from "../../utils/utils";

export const constructorSlice = createSlice({
    name: 'basket',
    initialState: {
        items: [],
        bun: null
    },
    reducers: {
        selectBun: (state, action) => {
            state.bun = action.payload;
        },
        addIngredient: (state, action) => {
            state.items.push({uuid: uuid(), ...action.payload});
        },
        removeIngredient: (state, action) => {
            state.items = state.items.filter(item => item.uuid !== action.payload)
        },
        fillBasket: (state, action) => {
            state.items = generateBasket(action.payload);
        },
        moveIngredient: (state, action) => {
        }
    }
})

export const {selectBun, addIngredient, removeIngredient, moveIngredient, fillBasket} = constructorSlice.actions;