import {closeModal, orderDetailsSlice} from "./order-details";
import {makeOrder} from "../actions/order-details";

describe('Order details reducers', () => {
    const reducer = orderDetailsSlice.reducer;
    const initialState = {
        orderId: null,
        isLoading: false,
        isFailed: false
    }
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it('makeOrder.fulfilled', () => {
        expect(reducer(initialState, makeOrder.fulfilled(42, '', []))).toEqual({
            orderId: 42,
            isLoading: false,
            isFailed: false
        })
    })

    it('makeOrder.pending', () => {
        expect(reducer(initialState, makeOrder.pending)).toEqual({
            orderId: null,
            isLoading: true,
            isFailed: false
        })
    })

    it('makeOrder.rejected', () => {
        expect(reducer(initialState, makeOrder.rejected)).toEqual({
            orderId: null,
            isLoading: false,
            isFailed: true
        })
    })

    it('closeModal', () => {
        const state = {...initialState, orderId: 42}
        expect(reducer(state, closeModal)).toEqual({
            orderId: null,
            isLoading: false,
            isFailed: false
        })
    })
})