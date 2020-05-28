import {DELETE_RESULT, STORE_RESULT} from "./actionTypes";

export const storeResult = (counter) => { // by using "thunk" we can use redux asynchronously.
    console.log("hey")
    return (dispatch /*getState*/) => setTimeout(() => {
        dispatch({type: STORE_RESULT, counter: counter})
    }, 2000)
}
export const deleteResult = (id) => ({type: DELETE_RESULT, id: id})