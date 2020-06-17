import React from "react";
import Modal from "../components/UI/Modal"
import useHttpClient from "../hooks/http-error-client"
const withErrorHandler = (WrappedComponent, axios) => {


    return props => {
        const [error, clearError] = useHttpClient(axios)
        return (<React.Fragment>
            <WrappedComponent {...props}/>
            <Modal show={error}
                   clicked={clearError}>
                {error ? error.message : null}
            </Modal>
        </React.Fragment>)
    }
}

export default withErrorHandler;