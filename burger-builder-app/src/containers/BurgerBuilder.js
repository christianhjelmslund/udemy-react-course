import React, {Component} from "react";
import Burger from "../components/Burger/Burger"
import BuildControls from "../components/Burger/BuildControls/BuildControls"
import Modal from "../components/UI/Modal"
import OrderSummary from "../components/OrderSummary/OrderSummary"
import Spinner from "../components/UI/Spinner/Spinner"
import axios from "../axios"
import withErrorHandler from "../hoc/withErrorHandler";


const INGREDIENT_PRICE = {
    salad: 0.5,
    cheese: 0.4,
    meat: 2,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false

    }

    componentDidMount() {
        axios.get("/ingredients.json").then(response =>
            this.setState({ingredients: response.data}
            )
        ).catch(error => {
            console.log(error)
            this.setState({error: true})
        })
    }

    updatePurchasable(ingredients) {
        const isPurchasable = (
            Object.values(ingredients)
                .reduce((acc, element) => acc + element, 0) > 0
        )
        this.setState({purchasable: isPurchasable})
    }

    purchaseHandler = () => {
        this.setState({purchasing: true})
    }

    purchaseCancelHandler = () => {
        this.setState({purchasing: false})
    }

    purchaseContinueHandler = () => {
        this.setState({loading: true})
        axios.post('/orders.json', {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Christian Hjelmslund',
                address: {
                    street: "Test Street",
                    zipCode: "2400",
                    country: "Denmark"
                },
                email: "test@test.com"
            }
        }).then(response =>
            this.setState({loading: false, purchasing: false}))
            .catch(error =>
                this.setState({loading: false, purchasing: false})
            ) //.json is firebase specific

    }

    addIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] + 1;
        const updatedIngredients = {...this.state.ingredients};

        updatedIngredients[type] = updatedIngredientCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICE[type]

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchasable(updatedIngredients)
    }

    removeIngredientHandler = (type) => {
        const updatedIngredientCount = this.state.ingredients[type] - 1;
        if (updatedIngredientCount < 0) {
            return
        }
        const updatedIngredients = {...this.state.ingredients};

        updatedIngredients[type] = updatedIngredientCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICE[type]

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        })
        this.updatePurchasable(updatedIngredients)
    }

    render() {
        const shouldBeDisabled = {...this.state.ingredients}

        for (let key in shouldBeDisabled) {
            shouldBeDisabled[key] = shouldBeDisabled[key] <= 0
        }

        let orderSummary = null;


        let burger = this.state.error ? <p> Ingredients can't be loaded </p> : <Spinner/>
        if (this.state.ingredients !== null) {
            burger = (<React.Fragment>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        totalPrice={this.state.totalPrice}
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        shouldBeDisabled={shouldBeDisabled}
                        purchasable={this.state.purchasable}
                        purchasing={this.purchaseHandler}
                    />
                </React.Fragment>
            )
            orderSummary = <OrderSummary
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}
                ingredients={this.state.ingredients}
                totalPrice={this.state.totalPrice}>
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

export default withErrorHandler(BurgerBuilder, axios);