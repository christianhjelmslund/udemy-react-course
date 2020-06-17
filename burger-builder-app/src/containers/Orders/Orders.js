import React, {useEffect} from "react";
import axios from "../../axios"

import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler";
import Spinner from "../../components/UI/Spinner/Spinner"
import * as actions from "../../store/actions/actions"
import {connect} from "react-redux";

const Orders = props => {

    const {onFetchOrders, token, userId} = props

    useEffect(() => {
        onFetchOrders(token, userId)
    }, [onFetchOrders, token, userId])

    const orders = props.orders.map(order => {
            return <Order key={order.id}
                          ingredients={order.ingredients}
                          price={order.price}
                          customer={order.customer}/>
        }
    )
    return props.loading ? <Spinner/> : <div> {orders}</div>
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

const mapStateToProps = state => {
    return {
        loading: state.order.loading,
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios))

