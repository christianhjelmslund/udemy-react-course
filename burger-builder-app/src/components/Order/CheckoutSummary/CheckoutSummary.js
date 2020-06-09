import React from "react";
import Burger from "../../Burger/Burger"
import SpecialButton from "../../UI/Button/Button"

import styles from "./CheckoutSummary.module.css"

const checkoutSummary = (props) => {
    return (
        <div style={{width: '100%', margin: 'auto'}} className={styles.CheckoutSummary}>
            <h1>Continue to checkout 😎</h1>
            <Burger ingredients={props.ingredients}> </Burger>
            <SpecialButton btnType={"Danger"}
                           clicked={props.checkoutCancelled}>CANCEL</SpecialButton>
            <SpecialButton btnType={"Success"}
                           clicked={props.checkoutContinued}>CONTINUE</SpecialButton>
        </div>
    )
}

export default checkoutSummary
