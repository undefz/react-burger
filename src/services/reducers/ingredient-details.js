import {createSlice} from "@reduxjs/toolkit";

export const ingredientDetailsSlice = createSlice({
    name: 'ingredientDetails',
    initialState: {
        selected: null
    },
    reducers: {
        select: (state, action) => {
            state.selected = action.payload;
        },
        deselect: (state) => {
            state.selected = null;
        }
    }
})

export const {select, deselect} = ingredientDetailsSlice.actions;
