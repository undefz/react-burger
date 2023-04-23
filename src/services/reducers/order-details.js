import {createSlice} from "@reduxjs/toolkit";

export const orderDetailsSlice = createSlice({
    name: 'orderDetails',
    initialState: {
        orderId: null,
        isLoading: false,
        isFailed: false,
    },
    reducers: {
        requestStarted: (state) => {
            state.isLoading = true;
            state.isFailed = false;
        },
        requestFailed: (state) => {
            state.orderId = '';
            state.isLoading = false;
            state.isFailed = true;
        },
        requestSuccess: (state, action) => {
            state.orderId = action.payload;
            state.isLoading = false;
            state.isFailed = false;
        },
        closeModal: (state) => {
            state.orderId = null;
        }
    }
})

export const {requestStarted, requestFailed, requestSuccess, closeModal} = orderDetailsSlice.actions;
