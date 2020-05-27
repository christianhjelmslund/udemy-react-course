import * as actionTypes from "../actions"

const initialState = {
    result: []
}

const resultsReducer = (oldState = initialState, action) => {
    let newState = {...oldState}
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            newState.result = newState.result.concat({id: new Date(), value: action.counter}) // good practice because we create a new object
            break
        case actionTypes.DELETE_RESULT:
            newState.result = newState.result.filter(element => element.id !== action.id)
            break
        default:
            return newState
    }
    console.log(newState.result)
    console.log(oldState.result)
    return newState
}

export default resultsReducer