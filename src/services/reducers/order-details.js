import {createSlice} from "@reduxjs/toolkit";
import {makeOrder} from "../actions/order-details";

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orderId: null,
        isLoading: false,
        isFailed: false,
    },
    reducers: {
        closeModal: (state) => {
            state.orderId = null;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(makeOrder.fulfilled, (state, action) => {
            state.orderId = action.payload;
            state.isLoading = false;
            state.isFailed = false;
        }).addCase(makeOrder.pending, state => {
            state.isLoading = true;
            state.isFailed = false;
        }).addCase(makeOrder.rejected, state => {
            state.orderId = '';
            state.isLoading = false;
            state.isFailed = true;
        })
    }
})

export const {closeModal} = orderDetailsSlice.actions;
