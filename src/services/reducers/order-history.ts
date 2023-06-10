import {TOrder} from "../../utils/burger-prop-types";
import {createSlice} from "@reduxjs/toolkit";
import {WS_GET_ORDERS} from "../actions/order-history";

export type TOrderHistory = {
    orders: Array<TOrder>
}

const initialState: TOrderHistory = {
    orders: []
}


export const orderHistorySlice = createSlice({
        name: 'orderHistory',
        initialState,
        reducers: {},
        extraReducers: builder => {
            builder.addCase(WS_GET_ORDERS, (state, action) => {
                state.orders = action.payload.orders
            })
        }
    }
)