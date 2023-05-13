import {createAsyncThunk} from "@reduxjs/toolkit";
import {queryIngredients} from "../../utils/http";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return queryIngredients();
    }
)