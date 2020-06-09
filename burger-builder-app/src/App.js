import React, {Component} from "react";
import {Route, Switch, Redirect} from "react-router-dom"
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux"


import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth"
import Logout from "./containers/Auth/Logout"

import * as actions from "./store/actions/actions"


class App extends Component {

    componentDidMount() {
        this.props.tryAutoLogin()
    }

    render() {

        let routes = <Switch>
            <Route path={"/auth"} component={Auth}/>
            <Route path={"/"} exact component={BurgerBuilder}/>
            <Redirect to={"/"}/>
        </Switch>

        if (this.props.isAuthenticated) {
            routes =
                <Switch>
                    <Route path={"/checkout"} component={Checkout}/>
                    <Route path={"/orders"} component={Orders}/>
                    <Route path={"/logout"} component={Logout}/>
                    <Route path={"/"} exact component={BurgerBuilder}/>
                    <Redirect to={"/"}/>
                </Switch>
        }

        return (

            <BrowserRouter>
                <Layout>
                    {routes}
                </Layout>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        tryAutoLogin: () => dispatch(actions.checkAuthState())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
