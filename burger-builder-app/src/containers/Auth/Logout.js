import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

import * as actions from "../../store/actions/actions"

class Logout extends Component {

    componentDidMount() {
        this.props.onLogout()
    }

    render() {
        return <Redirect to={"/"}/>
    }
}

const mapDispatchToProps = dispatch => {
    console.log("dispatching map to props in logout")
    return {
        onLogout: () => dispatch(actions.logout())
    }
}

export default connect(null, mapDispatchToProps)(Logout)