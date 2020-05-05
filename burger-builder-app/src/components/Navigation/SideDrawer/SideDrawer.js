import React from "react";
import Logo from "../../Logo/Logo"
import NavigationItems from "../Navigationitems/NavigationItems"
import styles from "./SideDrawer.module.css"
import Backdrop from "../../UI/Backdrop"

const sideDrawer = (props) => {
    const attachedClasses = props.open ? styles.Open : styles.Close
    console.log(props.open)
    return (
        <React.Fragment>
            <Backdrop show={props.open} clicked={props.closed}/>
            <div className={ [styles.SideDrawer, attachedClasses].join(' ') }>
                <Logo height={"11%"}/> {/* One way to do it - see in Toolbar for another way */}
                <nav>
                    <NavigationItems/>
                </nav>
            </div>
        </React.Fragment>
    );
}

export default sideDrawer;