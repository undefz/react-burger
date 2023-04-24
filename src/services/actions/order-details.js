import {ORDER_URL} from "../../utils/app-config";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const makeOrder = createAsyncThunk(
    'order/makeOrder',
    async (orderIds) => {
        const request = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ingredients: orderIds}),
        };

        return fetch(ORDER_URL, request)
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then(decoded => {
                if (decoded.success) {
                    return decoded.order.number;
                }
                return Promise.reject("Сервер ответил success=false");
            })
    })