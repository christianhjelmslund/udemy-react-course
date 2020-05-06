import React from "react";
import styles from "./NavigationItems.module.css"
import NavigationItem from "./NavigationItem"

const navigationItems = () =>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link="/" >Burger Builder</NavigationItem>
        <NavigationItem link="/orders">Orders</NavigationItem>
    </ul>
)

export default navigationItems;