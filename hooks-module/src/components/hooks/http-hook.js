import {useReducer, useCallback} from 'react'

const initialState = {loading: false, error: null, data: null, extra: null, identifier: null}

const httpReducer = (currentState, action) => {
    switch (action.type) {
        case 'SEND':
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                identifier: action.identifier
            }
        case 'RESPONSE':
            return {...currentState, loading: false, data: action.responseData, extra: action.extra}
        case 'ERROR':
            return {loading: false, error: action.error}
        case 'CLEAR':
            return initialState
        default:
    }

}
const useHttp = () => {
    const [state, dispatch] = useReducer(httpReducer, initialState)

    const clear = useCallback(() => dispatch({type: 'CLEAR'}),[])

    const sendRequest = useCallback((url, method, body, extra, identifier) => {
        dispatch({type: 'SEND', identifier: identifier})
        fetch(url, {
            method: method,
            body: body,
            headers: {'Content-Type': 'application/json'}
        }).then(response => {
            return response.json()
        }).then(responseData => {
            dispatch({type: 'RESPONSE', responseData: responseData, extra: extra})
        }).catch(error => {
            dispatch({type: 'ERROR', error: 'There was an error'})
        })
    }, [])

    return {
        isLoading: state.loading,
        error: state.error,
        data: state.data,
        sendRequest: sendRequest,
        extra: state.extra,
        identifier: state.identifier,
        clearError: clear
    }
}

export default useHttp