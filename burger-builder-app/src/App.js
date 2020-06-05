import React, {Component} from "react";
import {Route, Switch} from "react-router-dom"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose, combineReducers} from "redux"
import thunk from "redux-thunk"


import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer"
import orderReducer from "./store/reducers/orderReducer"


class App extends Component {

    checkoutPath = "/checkout"
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    rootReducer = combineReducers(({
        burgerBuilder: burgerBuilderReducer,
        order: orderReducer
    }))

    render() {
        return (
            <Provider
                store={createStore(this.rootReducer, this.composeEnhancers(applyMiddleware(thunk)))}>
                <BrowserRouter>
                    <Layout>
                        <Switch>
                            <Route path={this.checkoutPath} component={Checkout}/>
                            <Route path={"/orders"} component={Orders}/>
                            <Route path={"/"} component={BurgerBuilder}/>
                        </Switch>
                    </Layout>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
