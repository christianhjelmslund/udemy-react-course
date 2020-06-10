import * as actionTypes from "../actions/actionsTypes"
import {updateObject} from "../../shared/utility"

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirect: "/"
}
const authStart = (oldState) => updateObject(oldState, {error: null, loading: true})

const authFail = (oldState, action) => updateObject(oldState, {error: action.error, loading: false})

const authSuccess = (oldState, action) => updateObject(oldState, {
    token: action.idToken,
    userId: action.localId,
    error: null,
    loading: false
})

const authLogout = (oldState) => updateObject(oldState, {
    token: null,
    userId: null,
})

const setAuthRedirectPath = (oldState, action) =>
    updateObject(oldState, {
        authRedirect: action.path
    })

const authReducer = (oldState = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(oldState)
        case actionTypes.AUTH_FAIL:
            return authFail(oldState, action)
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(oldState, action)
        case actionTypes.AUTH_LOGOUT:
            return authLogout(oldState)
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(oldState, action)
        default:
            return oldState
    }
}

export default authReducer