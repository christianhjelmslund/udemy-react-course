import React from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux"

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

const Checkout = props => {

    const checkoutCancelledHandler = () => props.history.goBack();

    const checkoutContinuedHandler = () => props.history.replace("/checkout/contact-data")

    const redirect = <Redirect to={"/"}/>
    let summary = redirect

    if (props.ingredients) {
        summary = (<div>
            <CheckoutSummary ingredients={props.ingredients}
                             checkoutContinued={checkoutContinuedHandler}
                             checkoutCancelled={checkoutCancelledHandler}>
            </CheckoutSummary>
            <Route path={props.match.url + "/contact-data"} exact
                   component={ContactData}/>
            {props.purchased ? redirect : null}
        </div>)
    }
    return summary
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)