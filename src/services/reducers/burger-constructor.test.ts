import {constructorSlice} from "./burger-constructor";

describe('Burger constructor reducers', () => {
    const reducer = constructorSlice.reducer;
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
                items: [],
                bun: null
            }
        )
    })
})