import * as actionTypes from "../actions"

const initialState = {
    counter: 0,
}

const counterReducer = (oldState = initialState, action) => {
    let newState = {...oldState}
    switch (action.type) {
        case actionTypes.INCREMENT:
            newState.counter++
            break
        case actionTypes.DECREMENT:
            newState.counter--
            break
        case actionTypes.ADD_5:
            newState.counter += 5
            break
        case actionTypes.SUB_5:
            newState.counter -= 5
            break
        default:
            return newState
    }
    console.log(newState.result)
    console.log(oldState.result)
    return newState
}

export default counterReducer