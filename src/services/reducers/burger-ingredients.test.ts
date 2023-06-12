import {ingredientsSlice} from "./burger-ingredients";

describe('Burger ingredients reducers', () => {
    const reducer = ingredientsSlice.reducer;
    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual({
            items: [],
            isLoading: false,
            hasError: false
        })
    })
})