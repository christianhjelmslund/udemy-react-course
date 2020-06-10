import React, {Component} from "react";
import {connect} from "react-redux"
import * as actions from "../store/actions/actions"

import axios from "../axios"
import Burger from "../components/Burger/Burger"
import BuildControls from "../components/Burger/BuildControls/BuildControls"
import Modal from "../components/UI/Modal"
import OrderSummary from "../components/OrderSummary/OrderSummary"
import Spinner from "../components/UI/Spinner/Spinner"
import withErrorHandler from "../hoc/withErrorHandler";

export class BurgerBuilder extends Component {

    constructor(props) {
        super(props);
        this.state = {purchasing: false}
    }

    componentDidMount() {
        this.props.onInitIngredients()
    }

    updatePurchasable(ingredients) {
        if (ingredients) {
            return (Object.values(ingredients).reduce((acc, element) => acc + element, 0) > 0)
        }
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true})
        } else {
            this.props.onSetAuthRedirectPath("/checkout")
            this.props.history.push("/auth")
        }
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        this.props.onInitPurchase()
        this.props.history.push("/checkout")
    }

    render() {
        const shouldBeDisabled = {...this.props.ingredients}

        for (let key in shouldBeDisabled) {
            shouldBeDisabled[key] = shouldBeDisabled[key] <= 0
        }

        let orderSummary = null;

        let burger = this.props.error ? <p> Ingredients can't be loaded </p> : <Spinner/>
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
                        isAuthenticated={this.props.isAuthenticated}
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
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (ingredient) => dispatch(actions.addIngredient(ingredient)),
        onRemoveIngredient: (ingredient) => dispatch(actions.removeIngredient(ingredient)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseBurgerInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));