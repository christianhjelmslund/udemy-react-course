import React from "react";
import Toolbar from "../../components/Navigation/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import {connect} from "react-redux"
import classes from "./Layout.module.css";


class Layout extends React.Component {

    state = {
        showSideDrawer: false
    }

    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        })
    }

    sideDrawerOpenHandler = () => {
        this.setState({
            showSideDrawer: true
        })
    }

    render() {
        return (<React.Fragment>
            <Toolbar isAuthenticated={this.props.isAuthenticated}
                     open={this.sideDrawerOpenHandler}/>
            <SideDrawer isAuthenticated={this.props.isAuthenticated}
                        open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>{this.props.children}</main>
        </React.Fragment>)
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
