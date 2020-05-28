import * as actionTypes from "../actions/actionTypes"
import { updateObject } from "../utility"

const initialState = {
    counter: 0,
}

const counterReducer = (oldState = initialState, action) => {
    switch (action.type) {
        case actionTypes.INCREMENT: return updateObject(oldState, {counter: oldState.counter + 1})
        case actionTypes.DECREMENT: return updateObject(oldState, {counter: oldState.counter - 1})
        case actionTypes.ADD_5: return updateObject(oldState, {counter: oldState.counter + 5})
        case actionTypes.SUB_5: return updateObject(oldState, {counter: oldState.counter - 5})
        default:
            break
    }
    return oldState
}

export default counterReducer