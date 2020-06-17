import {useState, useEffect} from 'react'

export default httpClient => {
    const [error, setError] = useState(null)

    let reqInterceptorId
    let resInterceptorId

    reqInterceptorId = httpClient.interceptors.request.use(req => {
        // setError(null)
        return req
    })
    resInterceptorId = httpClient.interceptors.response.use(res => res, error => {
        setError(error)
    })

    useEffect(() => {
        return () => {
            httpClient.interceptors.request.eject(reqInterceptorId)
            httpClient.interceptors.response.eject(resInterceptorId)
        }
    }, [httpClient, reqInterceptorId, resInterceptorId])


    const clearError = () => {
        setError(null)
    }

    return [error, clearError]
}