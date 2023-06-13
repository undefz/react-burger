import {feedSlice} from "./feed";
import {WS_GET_ORDERS} from "../actions/feed";
import {TOrder} from "../../utils/burger-prop-types";

describe('Feed reducers', () => {
    const reducer = feedSlice.reducer;
    it('should return the initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(
            {
                orders: [],
                total: 0,
                totalToday: 0
            }
        )
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
        expect(reducer(undefined, WS_GET_ORDERS({
            orders: [testOrderA, testOrderB],
            total: 42,
            totalToday: 24
        }))).toEqual({
            orders: [testOrderA, testOrderB],
            total: 42,
            totalToday: 24
        })
    })
})