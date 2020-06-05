import * as actionTypes from "../actions/actionsTypes"
import {updateObject} from "../utility"

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
        case actionTypes.ADD_INGREDIENT: {
            const updatedIngredients = updateObject(oldState.ingredients,
                {[action.ingredient]: oldState.ingredients[action.ingredient] + 1})
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: oldState.totalPrice + INGREDIENT_PRICE[action.ingredient]
            };
            return updateObject(oldState, updatedState)
        }
        case actionTypes.REMOVE_INGREDIENT: {
            const updatedIngredients = updateObject(oldState.ingredients,
                {[action.ingredient]: oldState.ingredients[action.ingredient] - 1})
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: oldState.totalPrice - INGREDIENT_PRICE[action.ingredient]
            };
            return updateObject(oldState, updatedState)
        }
        case actionTypes.SET_INGREDIENTS:
            return updateObject(oldState, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 4
            })
        case actionTypes.SET_ERROR:
            return updateObject(oldState, {error: true})
        default:
            return oldState
    }
}

export default burgerBuilderReducer