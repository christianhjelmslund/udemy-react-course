import React from "react";
import styles from "./BuildControls.module.css";
import BuildControl from "./BuildControl"

const labels = [
    {label: "Salad", type: "salad"},
    {label: "Meat", type: "meat"},
    {label: "Cheese", type: "cheese"},
    {label: "Bacon", type: "bacon"},
]


const buildControls = (props) => {
    return (
        <div className={styles.BuildControls}>
            <p> <strong>The total price is {props.totalPrice.toFixed(2)}$</strong></p>
            {labels.map(ele => (
                <BuildControl key={ele.label + ele.type}
                              label={ele.label}
                              added={() => props.ingredientAdded(ele.type)}
                              removed={() => props.ingredientRemoved(ele.type)} // because it's a function you add () =>
                              shouldBeDisabled={props.shouldBeDisabled[ele.type]} // since it is a value, you dont need ^
                >
                </BuildControl>
            ))}
            <button className={styles.OrderButton} disabled={!props.purchasable} onClick={props.purchasing}> {props.isAuthenticated ? "ORDER NOW" : "SIGN UP TO ORDER" }</button>
        </div>
    )
}


export default buildControls;