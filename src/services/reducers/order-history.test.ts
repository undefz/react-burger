import {orderHistorySlice} from "./order-history";

describe('Order history reducers', () => {
    const reducer = orderHistorySlice.reducer;
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
            orders: []
        })
    })
})