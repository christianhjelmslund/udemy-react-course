import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import {connect} from "react-redux"

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";

class Checkout extends Component {

    // componentDidMount() {
    //     const query = new URLSearchParams(this.props.location.search)
    //     const ingredients = {}
    //     let price = 0
    //     for (let param of query.entries()) {
    //         if (param[0] === 'price') {
    //             price = param[1]
    //         } else {
    //             ingredients[param[0]] = +param[1]
    //         }
    //     }
    //     this.setState({
    //         ingredients: ingredients,
    //         totalPrice: price
    //     })
    // }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data")
    }

    render() {
        const redirect = <Redirect to={"/"}/>
        let summary = redirect

        if (this.props.ingredients) {
            summary = (<div>
                <CheckoutSummary ingredients={this.props.ingredients}
                                 checkoutContinued={this.checkoutContinuedHandler}
                                 checkoutCancelled={this.checkoutCancelledHandler}>
                </CheckoutSummary>
                <Route path={this.props.match.url + "/contact-data"} exact
                       component={ContactData}/>
                {this.props.purchased ? redirect : null}
            </div>)
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout)