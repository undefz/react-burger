import {orderDetailsSlice} from "./order-details";

describe('Order details reducers', () => {
    const reducer = orderDetailsSlice.reducer;
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
            orderId: null,
            isLoading: false,
            isFailed: false
        })
    })
})