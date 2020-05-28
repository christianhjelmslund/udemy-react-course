import React, {Component} from "react";
import axios from "../axios"
import {connect} from "react-redux"
import * as actionTypes from "../store/actions"


import Burger from "../components/Burger/Burger"
import BuildControls from "../components/Burger/BuildControls/BuildControls"
import Modal from "../components/UI/Modal"
import OrderSummary from "../components/OrderSummary/OrderSummary"
import Spinner from "../components/UI/Spinner/Spinner"
import withErrorHandler from "../hoc/withErrorHandler";

class BurgerBuilder extends Component {

    state = {
        purchasing: false,
        loading: false,
        error: false
    }

    // componentDidMount() {
    //     axios.get("/ingredients.json").then(response =>
    //         this.setState({ingredients: response.data}
    //         )
    //     ).catch(error => {
    //         console.log(error)
    //         this.setState({error: true})
    //     })
    // }

    updatePurchasable(ingredients) {
        return (Object.values(ingredients).reduce((acc, element) => acc + element, 0) > 0)
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        this.props.history.push("/checkout/");
        // QUERY PARAMETERS: just keeping the code for future reference - however with redux it
        // is not needed anymore

        // const queryParams = []
        // for (let i in this.props.ingredients) {
        //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ingredients[i]))
        // }
        // queryParams.push("price=" + this.props.totalPrice)
        // const queryString = queryParams.join("&")
        // this.props.history.push({
        //     pathname: "/checkout/",
        //     search: '?' + queryString
        // });

        // see componentDidMount in Checkout for how to use
    }
    // addIngredientHandler = (type) => {
    //     const updatedIngredientCount = this.state.ingredients[type] + 1;
    //     const updatedIngredients = {...this.state.ingredients};
    //
    //     updatedIngredients[type] = updatedIngredientCount;
    //     const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type]
    //
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     })
    //     this.updatePurchasable(updatedIngredients)
    // }

    // removeIngredientHandler = (type) => {
    //     const updatedIngredientCount = this.state.ingredients[type] - 1;
    //     if (updatedIngredientCount < 0) {
    //         return
    //     }
    //     const updatedIngredients = {...this.state.ingredients};
    //
    //     updatedIngredients[type] = updatedIngredientCount;
    //     const updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type]
    //
    //     this.setState({
    //         ingredients: updatedIngredients,
    //         totalPrice: updatedPrice
    //     })
    //     this.updatePurchasable(updatedIngredients)
    // }

    render() {
        const shouldBeDisabled = {...this.props.ingredients}

        for (let key in shouldBeDisabled) {
            shouldBeDisabled[key] = shouldBeDisabled[key] <= 0
        }

        let orderSummary = null;


        let burger = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner/>
        if (this.props.ingredients !== null) {
            burger = (<React.Fragment>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        totalPrice={this.props.totalPrice}
                        ingredientAdded={this.props.onAddIngredient}
                        ingredientRemoved={this.props.onRemoveIngredient}
                        shouldBeDisabled={shouldBeDisabled}
                        purchasable={this.updatePurchasable(this.props.ingredients)}
                        purchasing={this.purchaseHandler}
                    />
                </React.Fragment>
            )
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.props.ingredients}
                totalPrice={this.props.totalPrice}>
            </OrderSummary>
        }

        if (this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <React.Fragment>
                <Modal show={this.state.purchasing} clicked={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch({
            type: actionTypes.ADD_INGREDIENT,
            ingredient: ingredient
        }),
        onRemoveIngredient: (ingredient) => dispatch({
            type: actionTypes.REMOVE_INGREDIENT,
            ingredient: ingredient
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));