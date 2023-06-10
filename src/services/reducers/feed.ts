import {createSlice} from "@reduxjs/toolkit";
import {WS_GET_ORDERS} from "../actions/feed";
import {TOrder} from "../../utils/burger-prop-types";

export type TFeedState = {
    orders: Array<TOrder>
    total: number
    totalToday: number
}

const initialState: TFeedState = {
    orders: [],
    total: 0,
    totalToday: 0
}

export const feedSlice = createSlice({
        name: 'feed',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(WS_GET_ORDERS, (state, action) => {
                const newOrders = action.payload.orders;
                console.log(`Новые заказы: ${JSON.stringify(newOrders)}`);
                state.orders = newOrders;
                state.total = action.payload.total
                state.totalToday = action.payload.totalToday
            })
        }
    }
)