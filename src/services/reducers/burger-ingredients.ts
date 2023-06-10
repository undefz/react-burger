import {createSlice} from "@reduxjs/toolkit";
import {fetchIngredients} from "../actions/burger-ingredients";
import {TIngredient} from "../../utils/burger-prop-types";

type TIngredientsState = {
    items: Array<TIngredient>;
    isLoading: boolean;
    hasError: boolean;
}

const initialState: TIngredientsState = {
    items: [],
    isLoading: false,
    hasError: false
};

export const ingredientsSlice = createSlice({
    name: 'ingredients',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchIngredients.pending, state => {
            state.isLoading = true;
            state.hasError = false;
        }).addCase(fetchIngredients.rejected, state => {
            state.isLoading = false;
            state.hasError = true;
            state.items = [];
        }).addCase(fetchIngredients.fulfilled, (state, action) => {
            state.items = action.payload;
            state.isLoading = false;
            state.hasError = false;
        })
    }
})
