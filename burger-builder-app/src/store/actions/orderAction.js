import * as actionTypes from "./actionsTypes"
import axios from "../../axios"

const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

const fetchOrderSuccess = (orderData) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orderData
    }
}

const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: error
    }
}

const purchaseBurgerStart = () => ({type: actionTypes.PURCHASE_BURGER_START})

const fetchOrderStart = () => ({type: actionTypes.FETCH_ORDER_START})

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrderStart())
        axios.get("/orders.json").then(res => {
            const fetchedOrders = []
            for (let key in res.data) {
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                })
            }
            dispatch(fetchOrderSuccess(fetchedOrders))
        }).catch(error => (dispatch(fetchOrderFailed(error))))
    }
}

export const purchaseBurgerInit = () => ({type: actionTypes.PURCHASE_BURGER_INIT})

export const purchaseBurger = (formData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json', formData)
        .then(response =>
            dispatch(purchaseBurgerSuccess(response.data.name, formData))
        ).catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}