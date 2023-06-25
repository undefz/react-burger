import {ingredientsSlice} from "./burger-ingredients";
import {fetchIngredients} from "../actions/burger-ingredients";
import {TIngredient} from "../../utils/burger-prop-types";

describe('Burger ingredients reducers', () => {
    const reducer = ingredientsSlice.reducer;
    const initialState = {
        items: [],
        isLoading: false,
        hasError: false
    }

    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it('ingredients.pending', () => {
        expect(reducer(initialState, fetchIngredients.pending)).toEqual({
            items: [],
            isLoading: true,
            hasError: false
        })
    })

    it('ingredients.rejected', () => {
        expect(reducer(initialState, fetchIngredients.rejected)).toEqual({
            items: [],
            isLoading: false,
            hasError: true
        })
    })



    it('ingredients.fulfilled', () => {
        const a1: TIngredient = {
            _id: "1",
            calories: 0,
            carbohydrates: 0,
            fat: 0,
            image: "",
            image_large: "",
            image_mobile: "",
            name: "",
            price: 0,
            proteins: 0,
            type: 'bun',
            uuid: '1'
        }

        const a2: TIngredient = {
            _id: "2",
            calories: 0,
            carbohydrates: 0,
            fat: 0,
            image: "",
            image_large: "",
            image_mobile: "",
            name: "",
            price: 0,
            proteins: 0,
            type: 'bun',
            uuid: '2'
        }

        expect(reducer(initialState, fetchIngredients.fulfilled([a1, a2], '', undefined))).toEqual({
            items: [a1, a2],
            isLoading: false,
            hasError: false
        })
    })
})