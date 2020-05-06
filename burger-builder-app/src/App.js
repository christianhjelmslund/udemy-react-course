import React, {Component} from "react";
import {Route, Switch} from "react-router-dom"
import {BrowserRouter} from "react-router-dom";


import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";


class App extends Component {

    checkoutPath = "/checkout"

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Switch>
                        <Route path={this.checkoutPath} component={Checkout}/>
                        <Route path={"/orders"} component={Orders}/>
                        <Route path={"/"} component={BurgerBuilder}/>
                    </Switch>
                </Layout>
            </BrowserRouter>
        );
    }
}

export default App;
