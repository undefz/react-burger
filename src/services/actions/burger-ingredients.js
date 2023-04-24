import {REMOTE_URL} from "../../utils/app-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const fetchIngredients = createAsyncThunk(
    'ingredients/fetchIngredients',
    async () => {
        return fetch(REMOTE_URL)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(decoded => {
                if (decoded.success) {
                    return decoded.data;
                }
                return Promise.reject("Сервер ответил success=false");
            })
    }
)