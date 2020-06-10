import React from "react";
import Modal from "../components/UI/Modal"

const withErrorHandler = (WrappedComponent, axios) => {
    return class extends React.Component {

        state = {
            error: null
        }
        resInterceptorId;
        reqInterceptorId;

        componentDidMount() {
            this.reqInterceptorId = axios.interceptors.request.use(req => {
                this.setState({
                    error: null
                })
                return req
            })
            this.resInterceptorId = axios.interceptors.response.use(res => res, error => {
                this.setState({
                    error: error
                })
            })
        }

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptorId)
            axios.interceptors.response.eject(this.resInterceptorId)
        }

        errorConfirmedHandler = () => {
            this.setState({
                error: null
            })
        }

        render() {
            return (<React.Fragment>
                <WrappedComponent {...this.props}/>
                <Modal show={this.state.error}
                       clicked={this.errorConfirmedHandler}>
                    { this.state.error ? this.state.error.message : null}
                </Modal>
            </React.Fragment>)
        }
    }
}

export default withErrorHandler;