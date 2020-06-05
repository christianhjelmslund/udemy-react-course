import React, {Component} from "react";
import axios from "../../axios"

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner"
import * as actions from "../../store/actions/actions"
import {connect} from "react-redux";

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders()
    }

    render() {
        const orders = this.props.orders.map(order => {
                return <Order key={order.id}
                              ingredients={order.ingredients}
                              price={order.price}
                              customer={order.customer}/>
            }
        )
        return this.props.loading ? <Spinner/> : <div> {orders}</div>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

