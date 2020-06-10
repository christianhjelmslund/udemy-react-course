import React, {Component} from "react";
import axios from "../../../axios"
import {connect} from "react-redux"

import SpecialButton from "../../../components/UI/Button/Button"
import Input from "../../../components/UI/Input/Input"
import withErrorHandler from "../../../hoc/withErrorHandler";
import * as actions from "../../../store/actions/actions"
import {updateObject} from "../../../shared/utility"

import styles from "./ContactData.module.css"

class ContactData extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orderForm: {
                name: this.setupForm("input", "text", "Your Name", "", true),
                street: this.setupForm("input", "text", "Street", "", true),
                zipCode: this.setupForm("input", "text", "Zip", "", true),
                country: this.setupForm("input", "text", "Country", "", true),
                email: this.setupForm("input", "text", "Email", "", true),
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
    }

    setupForm = (elementType, elementConfigType, placeholder, value, required) => {
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

    orderHandler = (event) => {
        event.preventDefault()
        const formData = {}
        for (let formElementId in this.state.orderForm) {
            formData[formElementId] = this.state.orderForm[formElementId].value
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            userId: this.props.userId,
            orderData: formData
        }
        this.props.onOrderBurger(order, this.props.token)
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid // this approach is fine if you have
            // multiple rules
        }
        return isValid
    }

    inputChangedHandler = (event, inputId) => {
        // const updatedOrderData = {...this.state.orderForm} // this would not be cloned deeply,
        // because they are nested - however, we only need value
        // const updatedFormElement = {...updatedOrderData[inputId]}
        const updatedFormElement = updateObject(this.state.orderForm[inputId], {
            value: event.target.value,
            valid: this.checkValidity(event.target.value, this.state.orderForm[inputId].validation),
            touched: true
        })

        const updatedOrderData = updateObject(this.state.orderForm, {
            [inputId]: updatedFormElement
        })

        let formIsValid = true
        for (let inputId in updatedOrderData) {
            if (!updatedOrderData[inputId].valid) {
                formIsValid = false
                break
            }
        }
        this.setState({orderForm: updatedOrderData, formIsValid: formIsValid})
    }

    render() {
        const formElementArray = []

        for (let key in this.state.orderForm) {
            formElementArray.push(
                {id: key, config: this.state.orderForm[key]}
            )
        }
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form onSubmit={this.orderHandler}>
                    {formElementArray.map((formElement) => {
                            return (<Input key={formElement.id}
                                           elementType={formElement.config.elementType}
                                           elementConfig={formElement.config.elementConfig}
                                           value={formElement.config.value}
                                           changed={(event) => this.inputChangedHandler(event, formElement.id)}
                                           invalid={!formElement.config.valid}
                                           touched={formElement.config.touched}
                                           shouldValidate={formElement.config.validation}/>)
                        }
                    )}
                    <SpecialButton btnType={"Success"}
                                   disabled={!this.state.formIsValid}>ORDER</SpecialButton>
                </form>
            </div>
        )
    }
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