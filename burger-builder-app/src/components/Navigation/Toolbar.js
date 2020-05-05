import React from "react";
import Logo from "../Logo/Logo"
import styles from "./Toolbar.module.css"
import NavigationItems from "./Navigationitems/NavigationItems"
import DrawerToggle from "./DrawerToggle/DrawerToggle"

const toolbar = (props) => (
    <header className={styles.Toolbar}>
        <DrawerToggle clicked={props.open}/>
        <div className={styles.Logo}>
            <Logo/>
        </div>
        <nav className={styles.DesktopOnly}>
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar