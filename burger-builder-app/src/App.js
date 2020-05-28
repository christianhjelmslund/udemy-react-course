import React, {Component} from "react";
import {Route, Switch} from "react-router-dom"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux"
import {createStore} from "redux"


import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import reducer from "./store/reducer"


class App extends Component {

    checkoutPath = "/checkout"

    render() {
        return (
            <Provider store={createStore(reducer)}>
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
