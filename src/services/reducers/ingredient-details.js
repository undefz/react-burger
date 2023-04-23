import {createSlice} from "@reduxjs/toolkit";

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: {
        selected: null,
        open: false
    },
    reducers: {
        select: (state, action) => {
            state.selected = action.payload;
        },
        deselect: (state) => {
            state.selected = null;
        },
        open: (state) => {
            state.open = true;
        },
        close: (state) => {
            state.open = false;
        }
    }
})

export const {select, deselect, open, close} = ingredientDetailsSlice.actions;
