const redux = require('redux')
const createStore = redux.createStore;

// we try with node - just to show it is independent of react
const initialState = {
    counter: 0

}

// reducer - only thing which may update the state. // the currentState = initialState
// means that if currentState is undefined, it picks initialState.

const rootReducer = (currentState = initialState, action) => {
    let newState = {...currentState}
    if (action.type === "INC_COUNTER") {
        newState.counter = currentState.counter + 1
    } else if (action.type === "ADD_COUNTER") {
        newState.counter = currentState.counter + 10
    }
    return newState
}


// store
const store = createStore(rootReducer);
console.log(store.getState())

store.subscribe(() => {
    console.log('[subscription]', store.getState())
})

// dispatching action
store.dispatch({type: 'INC_COUNTER'})
store.dispatch({type: 'ADD_COUNTER', value: 10})

console.log(store.getState())

// subscription - the method inside subscribe gets called every time the state is updated.
