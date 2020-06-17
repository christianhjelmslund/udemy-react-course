import React, { lazy, Suspense, useEffect} from "react";
import {Route, Switch, Redirect} from "react-router-dom"
import {BrowserRouter} from "react-router-dom";
import {connect} from "react-redux"

import Spinner from "./components/UI/Spinner/Spinner"
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder";
import * as actions from "./store/actions/actions"

// lazy loading ↓
const Orders = lazy(() => import("./containers/Orders/Orders"))
const Auth = lazy(() => import("./containers/Auth/Auth"))
const Logout = lazy(() => import("./containers/Auth/Logout"))
const Checkout = lazy(() => import("./containers/Checkout/Checkout"))

const App = (props) => {

    const { tryAutoLogin } = props
    useEffect(() => {
        tryAutoLogin()
    }, [tryAutoLogin])

    let routes = <Switch>
        <Route path={"/auth"} component={Auth}/>
        <Route path={"/"} exact component={BurgerBuilder}/>
        <Redirect to={"/"}/>
    </Switch>

    if (props.isAuthenticated) {
        routes =
            <Switch>
                <Route path={"/checkout"} component={Checkout}/>
                <Route path={"/orders"} component={Orders}/>
                <Route path={"/logout"} component={Logout}/>
                <Route path={"/auth"} component={Auth}/>
                <Route path={"/"} exact component={BurgerBuilder}/>
                <Redirect to={"/"}/>
            </Switch>
    }

    return (
        <Suspense fallback={<Spinner/>}>
            <BrowserRouter>
                <Layout>
                    {routes}
                </Layout>
            </BrowserRouter>
        </Suspense>
    );
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
