import * as actionTypes from "../actions/actionTypes"
import {updateObject} from "../utility"

const initialState = {
    result: []
}

const resultsReducer = (oldState = initialState, action) => {
    switch (action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(oldState, {result: oldState.result.concat({id: new Date(), value: action.counter})})
        case actionTypes.DELETE_RESULT:
            return updateObject(oldState, {result: oldState.result.filter(element => element.id !== action.id)})
        default:
            break
    }
    return oldState
}


export default resultsReducer