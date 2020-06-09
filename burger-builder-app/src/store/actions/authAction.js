import * as actionTypes from "./actionsTypes"
import axios from "axios"

const authStart = () => ({type: actionTypes.FETCH_ORDER_START})
const authSuccess = (idToken, localId) => ({
    type: actionTypes.AUTH_SUCCESS,
    idToken: idToken,
    localId: localId
})
const authFail = (error) => ({type: actionTypes.AUTH_FAIL, error: error})
const checkAuthTimeout = (expirationTime) => {
    return dispatch => setTimeout(() => {
        dispatch(logout())
    }, expirationTime * 1000)
}
export const logout = () => {
    localStorage.removeItem("token")
    localStorage.removeItem("expirationDate")
    localStorage.removeItem("userId")
    return {type: actionTypes.AUTH_LOGOUT}
}


export const auth = (email, password, isSignUpMode) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {email: email, password: password, returnSecureToken: true}
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBMieMdCmmN35SQf6pXckBrskyHpcMTBI"
        if (!isSignUpMode) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBMieMdCmmN35SQf6pXckBrskyHpcMTBI"
        }
        axios.post(url, authData)
            .then(response => {
                localStorage.setItem("token", response.data.idToken)
                localStorage.setItem("expirationDate", new Date(new Date().getTime() + response.data.expiresIn * 1000))
                localStorage.setItem("userId", response.data.localId)
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {type: actionTypes.SET_AUTH_REDIRECT_PATH, path: path}
}

export const checkAuthState = () => {
    return dispatch => {
        const token = localStorage.getItem("token")
        if (!token) {
            console.log("here")
            dispatch(logout())
        } else {
            const expirationDate = new Date(localStorage.getItem("expirationDate"))
            if (new Date() > expirationDate) {
                console.log("here1")
                dispatch(logout())
            } else {
                dispatch(authSuccess(token, localStorage.getItem("userId")))
                dispatch(checkAuthTimeout((expirationDate.getTime() - new Date().getTime() )/1000))
            }
        }
    }
}