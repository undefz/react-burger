import {createSlice} from "@reduxjs/toolkit";
import {makeOrder} from "../actions/order-details";

type TOrderDetailsState = {
    orderId: number|null;
    isLoading: boolean;
    isFailed: boolean;
}

const initialState: TOrderDetailsState = {
    orderId: null,
    isLoading: false,
    isFailed: false,
};

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState,
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
            state.orderId = null;
            state.isLoading = false;
            state.isFailed = true;
        })
    }
})

export const {closeModal} = orderDetailsSlice.actions;
