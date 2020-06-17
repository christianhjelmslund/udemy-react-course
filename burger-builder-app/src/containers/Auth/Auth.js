import React, {useState, useEffect} from "react";
import {connect} from "react-redux"
import {Redirect} from "react-router-dom";

import Input from "../../components/UI/Input/Input"
import Button from "../../components/UI/Button/Button"
import styles from "./Auth.module.css"
import * as actions from "../../store/actions/actions"


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

const Auth = props => {

    const [form, setForm] = useState({
        email: setupForm("input", "email", "Email", "", true),
        password: setupForm("input", "password", "Password", "", true),
    })
    const [isSignUpMode, setIsSignUpMode] = useState(false)

    const {building, authRedirectPath, onRedirectPath} = props
    useEffect(() => {
        if (!building && authRedirectPath !== "/") {
            onRedirectPath()
        }
    }, [building, authRedirectPath, onRedirectPath])


    const inputChangedHandler = (event, formId) => {
        setForm({
            ...form,
            [formId]: {
                ...form[formId],
                value: event.target.value,
                touched: true,
                valid: checkValidity(event.target.value, form[formId].validation)
            }
        })
    }

    const submitHandler = (event) => {
        event.preventDefault()
        props.onAuth(form.email.value, form.password.value, isSignUpMode)
    }
    console.log(!isSignUpMode)
    const switchSignUpModeHandler = () => {
        console.log("entered here")
        setIsSignUpMode(!isSignUpMode)
    }

    const checkValidity = (value, rules) => {
        let isValid = true
        if (rules.required) {
            isValid = value.trim() !== '' && isValid // this approach is fine if you have
            // multiple rules
        }
        return isValid
    }
    const formElementArray = []
    for (let key in form) {
        formElementArray.push(
            {id: key, config: form[key]}
        )
    }

    let errorMessage = null
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    let redirect = null
    if (props.isAuthenticated) {
        redirect = <Redirect to={props.authRedirectPath}/>
    }

    return (
        <div className={styles.Auth}>
            {redirect}
            {errorMessage}
            <form onSubmit={submitHandler}>
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
                <Button btnType={"Success"}>SUBMIT</Button>
            </form>
            <Button btnType={"Danger"}
                    clicked={switchSignUpModeHandler}> {isSignUpMode ? "SWITCH TO SIGN IN" : "SWITCH TO SIGN UP"} </Button>
        </div>
    )
}

const mapStateToProps = state => {
    return {
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        building: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirect
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUpMode) => dispatch(actions.auth(email, password, isSignUpMode)),
        onRedirectPath: () => dispatch(actions.setAuthRedirectPath("/"))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)