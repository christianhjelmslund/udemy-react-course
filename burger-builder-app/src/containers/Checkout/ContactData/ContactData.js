import React, {Component} from "react";
import axios from "../../../axios"

import SpecialButton from "../../../components/UI/Button/Button"

import styles from "./ContactData.module.css"

class ContactData extends Component {
    state = {
        name: "",
        email: "",
        address: {
            street: "",
            zip: ""
        },
        loading: false
    }

    orderHandler = (event) => {
        event.preventDefault()
        this.setState({loading: true})

        axios.post('/orders.json', {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Christian Hjelmslund',
                address: {
                    street: "Test Street",
                    zipCode: "2400",
                    country: "Denmark"
                },
                email: "abe@eyoo.dk"
            }
        }).then(response => {
            console.log("sent reponse in ContactData: " + response.status)
            this.setState({loading: false})
            this.props.history.push("/")
        }).catch(error => {
            console.log(error)
            this.setState({loading: false})
        }) //.json is firebase specific
    }

    render() {
        return (
            <div className={styles.ContactData}>
                <h4>Enter your Contact Data</h4>
                <form>
                    <input className={styles.Input} type={"text"} name={"name"}
                           placeholder={"Your" +
                           " name"}/>
                    <input className={styles.Input} type={"email"} name={"email"}
                           placeholder={"Your" +
                           " email"}/>
                    <input className={styles.Input} type={"text"} name={"street"}
                           placeholder={"Street"}/>
                    <input className={styles.Input} type={"text"} name={"zip"} placeholder={"Zip"}/>
                    <SpecialButton btnType={"Success"}
                                   clicked={this.orderHandler}>ORDER</SpecialButton>
                </form>
            </div>
        )
    }

}

export default ContactData