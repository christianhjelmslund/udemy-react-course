import * as actionTypes from "../actions/actionsTypes"

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false
}

const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 0.7
}

const burgerBuilderReducer = (oldState = initialState, action) => {

    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            return {
                ...oldState,
                ingredients: {
                    ...oldState.ingredients,
                    [action.ingredient]: oldState.ingredients[action.ingredient] + 1
                },
                totalPrice: oldState.totalPrice + INGREDIENT_PRICE[action.ingredient]
            }
        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...oldState,
                ingredients: {
                    ...oldState.ingredients,
                    [action.ingredient]: oldState.ingredients[action.ingredient] - 1
                },
                totalPrice: oldState.totalPrice - INGREDIENT_PRICE[action.ingredient]
            }
        case actionTypes.SET_INGREDIENTS:
            console.log("setting ingredients")
            return {...oldState, ingredients: action.ingredients, error: false}
        case actionTypes.SET_ERROR:
            console.log("no?")
            return {...oldState, error: true}
        default:
            console.log("default case in burgerBuilderReducer")
    }
    return oldState
}

export default burgerBuilderReducer