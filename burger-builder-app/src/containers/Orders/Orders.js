import React, {Component} from "react";
import axios from "../../axios"

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner"

class Orders extends Component {

    constructor(props) {
        super(props);
        this.state = {
            orders: [],
            loading: true
        };
    }

    componentDidMount() {
        axios.get("/orders.json").then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            this.setState({
                orders: fetchedOrders,
                loading: false
            })
            console.log(fetchedOrders)
        }).catch(err => {
            this.setState({
                loading: false
            })
        })


    }

    render() {
        const orders = this.state.orders.map(order => {
                return <Order key={order.id}
                              ingredients={order.ingredients}
                              price={order.price}
                              customer={order.customer}/>
            }
        )
        return this.state.loading ? <Spinner/> : <div> {orders}</div>
    }
}

export default withErrorHandler(Orders, axios)

