// load component asynchronously => used to make sure that components of the application isn't
// loaded upon start, if it isn't needed (like new post).

import React, {Component} from "react"


const asyncComponent = (importComponent) => {
    return class extends Component {

        state = {
            component: null
        }

        componentDidMount() {
            importComponent().then(cmp => {
                    this.setState({component: cmp.default})
                }
            )
        }

        render() {
            const C = this.state.component
            return C ? <C {...this.props} /> : null
        }
    }
}

export default asyncComponent;