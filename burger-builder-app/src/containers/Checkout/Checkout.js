import React, {Component} from "react";
import {Route} from "react-router-dom";
import {connect} from "react-redux"

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Spinner from "../../components/UI/Spinner/Spinner"

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
        return (
            this.props.ingredients ?
                <div>
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     checkoutContinued={this.checkoutContinuedHandler}
                                     checkoutCancelled={this.checkoutCancelledHandler}>
                    </CheckoutSummary>
                    <Route path={this.props.match.url + "/contact-data"} exact
                           component={ContactData}/>
                </div> : <Spinner/>

        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients
    }
}

export default connect(mapStateToProps)(Checkout)