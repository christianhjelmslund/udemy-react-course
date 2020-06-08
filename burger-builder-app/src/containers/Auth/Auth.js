import React, {Component} from "react";
import {connect} from "react-redux"


import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import styles from "./Auth.module.css"
import * as actions from "../../store/actions/actions"


class Auth extends Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                email: this.setupForm("input", "email", "Email", "", true),
                password: this.setupForm("input", "password", "Password", "", true),
            },
            isSignUpMode: false
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

    inputChangedHandler = (event, formId) => {
        this.setState({
            form: {
                ...this.state.form,
                [formId]: {
                    ...this.state.form[formId],
                    value: event.target.value,
                    touched: true,
                    valid: this.checkValidity(event.target.value, this.state.form[formId].validation)
                    // just checks if it is empty
                }
            }
        })
    }

    submitHandler = (event) => {
        event.preventDefault()
        this.props.onAuth(this.state.form.email.value, this.state.form.password.value, this.state.isSignUpMode)
    }

    switchSignUpModeHandler = () => {
        this.setState(previousState => {
            return {
                isSignUpMode: !previousState.isSignUpMode
            }
        })
    }

    checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid // this approach is fine if you have
            // multiple rules
        }
        return isValid
    }

    render() {
        const formElementArray = []
        for (let key in this.state.form) {
            formElementArray.push(
                {id: key, config: this.state.form[key]}
            )
        }
        let errorMessage = null
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }
        return (
            <div className={styles.Auth}>
                {errorMessage}
                <form onSubmit={this.submitHandler}>
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
                    <Button btnType={"Success"}>SUBMIT</Button>
                </form>
                <Button btnType={"Danger"}
                        clicked={this.switchSignUpModeHandler}> {this.state.isSignUpMode ? "SWITCH TO SIGN IN" : "SWITCH TO SIGN UP"} </Button>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        error: state.auth.error
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpMode) => dispatch(actions.auth(email, password, isSignUpMode))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)