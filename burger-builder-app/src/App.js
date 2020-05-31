import React, {Component} from "react";
import {Route, Switch} from "react-router-dom"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"
import {createStore, applyMiddleware, compose} from "redux"
import thunk from "redux-thunk"


import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import burgerBuilderReducer from "./store/reducers/burgerBuilderReducer"


class App extends Component {

    checkoutPath = "/checkout"
    composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    render() {
        return (
            <Provider store={createStore(burgerBuilderReducer, this.composeEnhancers(applyMiddleware(thunk)))}>
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
