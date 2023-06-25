import {orderHistorySlice} from "./order-history";
import {WS_GET_ORDERS} from "../actions/order-history";
import {TOrder} from "../../utils/burger-prop-types";

describe('Order history reducers', () => {
    const reducer = orderHistorySlice.reducer;
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
            orders: []
        })
    })
    it('should update state', () => {
        const testOrderA: TOrder = {
            _id: 'a',
            name: 'test',
            status: 'done',
            number: 60,
            createdAt: '123',
            updatedAt: '456',
            ingredients: ['a', 'b', 'c']
        }
        const testOrderB: TOrder = {
            _id: 'a',
            name: 'test',
            status: 'done',
            number: 61,
            createdAt: '123',
            updatedAt: '456',
            ingredients: ['a', 'b', 'c']
        }

        expect(reducer(undefined, WS_GET_ORDERS(
            {
                orders: [testOrderA, testOrderB]
            }
        ))).toEqual({
                orders: [testOrderB, testOrderA]
            }
        )
    })
})