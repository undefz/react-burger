import {createSlice} from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState: {
        items: [],
        isLoading: true,
        hasError: false
    },
    reducers: {
        fetchStarted: (state) => {
            state.isLoading = true;
            state.hasError = false;
        },
        fetchSuccess: (state, action) => {
            state.isLoading = false;
            state.hasError = false;
            state.items = action.payload;
        },
        fetchError: (state) => {
            state.items = [];
            state.isLoading = false;
            state.hasError = true;
        }
    }
})

export const {fetchStarted, fetchSuccess, fetchError} = ingredientsSlice.actions;