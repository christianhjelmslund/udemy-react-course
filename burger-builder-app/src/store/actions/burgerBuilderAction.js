import * as actionTypes from "./actionsTypes"
import axios from "../../axios"

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredient: ingredientName
    }
}
export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredient: ingredientName
    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients
    }
}
export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.SET_ERROR,
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get("/ingredients.json").then(response => {
                dispatch(setIngredients(response.data))
            }
        ).catch(error => {
            dispatch(fetchIngredientsFailed())
        })
    }
}

