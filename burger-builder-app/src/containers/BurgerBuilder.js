import React, {useEffect, useState} from "react";
import {connect} from "react-redux"
import * as actions from "../store/actions/actions"

import axios from "../axios"
import Burger from "../components/Burger/Burger"
import BuildControls from "../components/Burger/BuildControls/BuildControls"
import Modal from "../components/UI/Modal"
import OrderSummary from "../components/OrderSummary/OrderSummary"
import Spinner from "../components/UI/Spinner/Spinner"
import withErrorHandler from "../hoc/withErrorHandler";

export const BurgerBuilder = props => {

    const [purchasing, setPurchasing] = useState(false)

    const { onInitIngredients } = props
    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])

    const updatePurchasable = ingredients => {
        if (ingredients) {
            return (Object.values(ingredients).reduce((acc, element) => acc + element, 0) > 0)
        }
    }

    const purchaseHandler = () => {
        if (props.isAuthenticated) {
            setPurchasing(true)
        } else {
            props.onSetAuthRedirectPath("/checkout")
            props.history.push("/auth")
        }
    }

    const purchaseCancelHandler = () => setPurchasing(false)

    const purchaseContinueHandler = () => {
        props.onInitPurchase()
        props.history.push("/checkout")
    }

    const shouldBeDisabled = {...props.ingredients}

    for (let key in shouldBeDisabled) {
        shouldBeDisabled[key] = shouldBeDisabled[key] <= 0
    }

    let orderSummary = null;

    let burger = props.error ? <p> Ingredients can't be loaded </p> : <Spinner/>
    if (props.ingredients !== null) {
        burger = (<React.Fragment>
                <Burger ingredients={props.ingredients}/>
                <BuildControls
                    totalPrice={props.totalPrice}
                    ingredientAdded={props.onAddIngredient}
                    ingredientRemoved={props.onRemoveIngredient}
                    shouldBeDisabled={shouldBeDisabled}
                    purchasable={updatePurchasable(props.ingredients)}
                    purchasing={purchaseHandler}
                    isAuthenticated={props.isAuthenticated}
                />
            </React.Fragment>
        )
        orderSummary = <OrderSummary
            purchaseCancelled={purchaseCancelHandler}
            purchaseContinued={purchaseContinueHandler}
            ingredients={props.ingredients}
            totalPrice={props.totalPrice}>
        </OrderSummary>
    }

    return (
        <React.Fragment>
            <Modal show={purchasing} clicked={purchaseCancelHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </React.Fragment>
    );
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