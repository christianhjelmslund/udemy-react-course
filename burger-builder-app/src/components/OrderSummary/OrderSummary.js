import React from "react";
import SpecialButton from "../UI/Button/Button"

const OrderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(key =>
            <p key={key + props.ingredients[key]}>{key} x {props.ingredients[key]}</p>
        )

    return (<React.Fragment>
        <h3>Your Order</h3>
        <strong>A burger with the following ingredients:</strong>
        {ingredientsSummary}
        <p>Total price: {props.totalPrice.toFixed(2)}$</p>
        <SpecialButton btnType={"Danger"}
                       clicked={props.purchaseCancelled}>CANCEL</SpecialButton>
        <SpecialButton btnType={"Success"}
                       clicked={props.purchaseContinued}>CONTINUE</SpecialButton>
    </React.Fragment>)

}

export default OrderSummary