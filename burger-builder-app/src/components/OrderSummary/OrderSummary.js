import React, {Component} from "react";
import SpecialButton from "../UI/Button/Button"

class OrderSummary extends Component {

    render () {
        const ingredientsSummary = Object.keys( this.props.ingredients)
            .map(key =>
                <p key={key+this.props.ingredients[key]}>{key} x { this.props.ingredients[key]}</p>
            )

        return (<React.Fragment>
            <h3>Your Order</h3>
            <strong>A burger with the following ingredients:</strong>
            {ingredientsSummary}
            <p>Total price: {this.props.totalPrice.toFixed(2)}$</p>
            <SpecialButton btnType={"Danger"} clicked={this.props.purchaseCancelled}>CANCEL</SpecialButton>
            <SpecialButton btnType={"Success"} clicked={this.props.purchaseContinued}>CONTINUE</SpecialButton>
        </React.Fragment>)
    }

}

export default OrderSummary