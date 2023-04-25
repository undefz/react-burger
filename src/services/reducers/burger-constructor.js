import {createSlice} from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";

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
        moveIngredient: (state, action) => {
            const {item, shift} = action.payload;
            const index = state.items.findIndex(x => x.uuid === item.uuid);

            const taken = state.items.splice(index, 1)[0];
            state.items.splice(index + shift, 0, taken);
        }
    }
})

export const {selectBun, addIngredient, removeIngredient, moveIngredient, fillBasket} = constructorSlice.actions;