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
    }, expirationTime)
}
const logout = () => ({type: actionTypes.AUTH_LOGOUT})



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
                dispatch(authSuccess(response.data.idToken, response.data.localId))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}