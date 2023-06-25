import {addIngredient, constructorSlice, moveIngredient, removeIngredient, selectBun} from "./burger-constructor";
import {TIngredient} from "../../utils/burger-prop-types";

describe('Burger constructor reducers', () => {
    const reducer = constructorSlice.reducer;

    const bun: TIngredient = {
        _id: "",
        calories: 0,
        carbohydrates: 0,
        fat: 0,
        image: "",
        image_large: "",
        image_mobile: "",
        name: "",
        price: 0,
        proteins: 0,
        type: 'bun'
    }

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

    const a3: TIngredient = {
        _id: "3",
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
        uuid: '3'
    }


    const initialState = {
        items: [],
        bun: null
    }

    it('has initial state', () => {
        expect(reducer(undefined, {type: 'test'})).toEqual(initialState)
    })

    it('selectBun', () => {
        expect(reducer(initialState, selectBun(bun))).toEqual({
            items: [],
            bun: bun
        })
    })

    it('addIngredient', () => {
        const testState = {
            items: [a1],
            bun: null
        }

        expect(reducer(testState, addIngredient(a2))).toEqual({
            items: [a1, a2],
            bun: null
        })
    })

    it('removeIngredient', () => {
        const testState = {
            items: [a1, a2],
            bun: null
        }

        expect(reducer(testState, removeIngredient('1'))).toEqual({
            items: [a2],
            bun: null
        })
    })

    it('moveIngredient', () => {
        const testState = {
            items: [a1, a2, a3],
            bun: null
        }

        expect(reducer(testState, moveIngredient({item: a1, shift: 2}))).toEqual({
            items: [a2, a3, a1],
            bun: null
        })
    })
})