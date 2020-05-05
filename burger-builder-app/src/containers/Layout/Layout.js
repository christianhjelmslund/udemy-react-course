import React from "react";
import Toolbar from "../../components/Navigation/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
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
        console.log("clicked")
        this.setState({
            showSideDrawer: true
        })
    }

    render() {
        return (<React.Fragment>
            <Toolbar open={this.sideDrawerOpenHandler}/>
            <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}/>
            <main className={classes.Content}>{this.props.children}</main>
        </React.Fragment>)
    }
}

export default Layout;
