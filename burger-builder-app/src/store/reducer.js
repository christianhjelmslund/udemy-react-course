import * as actionTypes from "./actions"

const initialState = {
    ingredients: {
        meat: 0,
        salad: 0,
        bacon: 0,
        cheese: 0
    },
    totalPrice: 4
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 0.7
}

const reducer = (oldState = initialState, action) => {

    console.log(oldState.totalPrice)
    if (action.type === actionTypes.ADD_INGREDIENT) {
        return {
            ...oldState,
            ingredients: {
                ...oldState.ingredients,
                [action.ingredient]: oldState.ingredients[action.ingredient] + 1
            },
            totalPrice: oldState.totalPrice + INGREDIENT_PRICE[action.ingredient]
        }
    } else if (action.type === actionTypes.REMOVE_INGREDIENT) {
        return {
        ...oldState,
            ingredients: {
                ...oldState.ingredients,
                [action.ingredient]: oldState.ingredients[action.ingredient] - 1
            },
            totalPrice: oldState.totalPrice - INGREDIENT_PRICE[action.ingredient]
        }
    }
    return oldState
}

export default reducer