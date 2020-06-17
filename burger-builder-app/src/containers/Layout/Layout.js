import React, {useState} from "react";
import Toolbar from "../../components/Navigation/Toolbar"
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer"
import {connect} from "react-redux"
import classes from "./Layout.module.css";


const Layout = (props) => {

    const [showSideDrawer, setSideDrawer] = useState(false)


    const sideDrawerClosedHandler = () => setSideDrawer(false)

    const sideDrawerOpenHandler = () => setSideDrawer(true)

    return (<React.Fragment>
        <Toolbar isAuthenticated={props.isAuthenticated}
                 open={sideDrawerOpenHandler}/>
        <SideDrawer isAuthenticated={props.isAuthenticated}
                    open={showSideDrawer} closed={sideDrawerClosedHandler}/>
        <main className={classes.Content}>{props.children}</main>
    </React.Fragment>)
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    }
}

export default connect(mapStateToProps)(Layout);
