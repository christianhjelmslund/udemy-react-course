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

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart())
        const queryParams = '?auth=' + token + '&orderBy="userId"&equalTo="' + userId + '"'
        axios.get("/orders.json" + queryParams).then(res => {
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

export const purchaseBurger = (formData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axios.post('/orders.json?auth=' + token, formData)
        .then(response =>
            dispatch(purchaseBurgerSuccess(response.data.name, formData))
        ).catch(error => {
            dispatch(purchaseBurgerFail(error))
        })
    }
}