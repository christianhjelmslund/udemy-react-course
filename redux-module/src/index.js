import React from 'react';
import ReactDOM from 'react-dom';
import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import thunk from "redux-thunk";

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import counterReducer from "./store/reducers/counter";
import resultsReducer from "./store/reducers/results";

const rootReducer = combineReducers({
    counterReducer: counterReducer,
    resultsReducer: resultsReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const logger = store => {
    return next => {
        return action => {
            console.log("[Middleware] Dispatching: ", action)
            const result = next(action)
            console.log("[Middleware] next state", store.getState())
            return result
        }
    }
}


ReactDOM.render(<Provider
    store={createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)))}><App/></Provider>, document.getElementById('root'));
registerServiceWorker();
