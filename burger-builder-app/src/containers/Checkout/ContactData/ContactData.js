import React, {useState} from "react";
import axios from "../../../axios"
import {connect} from "react-redux"

import SpecialButton from "../../../components/UI/Button/Button"
import Input from "../../../components/UI/Input/Input"
import withErrorHandler from "../../../hoc/withErrorHandler";
import * as actions from "../../../store/actions/actions"
import {updateObject} from "../../../shared/utility"

import styles from "./ContactData.module.css"

const setupForm = (elementType, elementConfigType, placeholder, value, required) => {
    return ({
        elementType: elementType,
        elementConfig: {
            type: elementConfigType,
            placeholder: placeholder
        },
        value: value,
        validation: {required: required},
        valid: false,
        touched: false
    })
}

const ContactData = props => {
    const [contactDataState, setContactDataState] = useState(
        {
            orderForm: {
                name: setupForm("input", "text", "Your Name", "", true),
                street: setupForm("input", "text", "Street", "", true),
                zipCode: setupForm("input", "text", "Zip", "", true),
                country: setupForm("input", "text", "Country", "", true),
                email: setupForm("input", "text", "Email", "", true),
                deliveryMethod: {
                    elementType: "select",
                    elementConfig: {
                        options: [
                            {value: "fastest", displayValue: "Fastest"},
                            {value: "cheapest", displayValue: "Cheapest"},
                        ]
                    },
                    value: "fastest",
                    validation: {},
                    valid: true
                },
            },
            formIsValid: false,
        }
    )

    const orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let formElementId in contactDataState.orderForm) {
            formData[formElementId] = contactDataState.orderForm[formElementId].value
        }
        const order = {
            ingredients: props.ingredients,
            price: props.price,
            userId: props.userId,
            orderData: formData
        }
        props.onOrderBurger(order, props.token)
    }

    const checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid // this approach is fine if you have
            // multiple rules
        }
        return isValid
    }

    const inputChangedHandler = (event, inputId) => {
        // const updatedOrderData = {...this.state.orderForm} // this would not be cloned deeply,
        // because they are nested - however, we only need value
        // const updatedFormElement = {...updatedOrderData[inputId]}
        const updatedFormElement = updateObject(contactDataState.orderForm[inputId], {
            value: event.target.value,
            valid: checkValidity(event.target.value, contactDataState.orderForm[inputId].validation),
            touched: true
        })

        const updatedOrderData = updateObject(contactDataState.orderForm, {
            [inputId]: updatedFormElement
        })

        let formIsValid = true
        for (let inputId in updatedOrderData) {
            if (!updatedOrderData[inputId].valid) {
                formIsValid = false
                break
            }
        }
        // won't wokr
        setContactDataState({orderForm: updatedOrderData, formIsValid: formIsValid})
    }

    const formElementArray = []

    for (let key in contactDataState.orderForm) {
        formElementArray.push(
            {id: key, config: contactDataState.orderForm[key]}
        )
    }
    return (
        <div className={styles.ContactData}>
            <h4>Enter your Contact Data</h4>
            <form onSubmit={orderHandler}>
                {formElementArray.map((formElement) => {
                        return (<Input key={formElement.id}
                                       elementType={formElement.config.elementType}
                                       elementConfig={formElement.config.elementConfig}
                                       value={formElement.config.value}
                                       changed={(event) => inputChangedHandler(event, formElement.id)}
                                       invalid={!formElement.config.valid}
                                       touched={formElement.config.touched}
                                       shouldValidate={formElement.config.validation}/>)
                    }
                )}
                <SpecialButton btnType={"Success"}
                               disabled={!contactDataState.formIsValid}>ORDER</SpecialButton>
            </form>
        </div>
    )
}


const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (formData, token) => dispatch(actions.purchaseBurger(formData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios))