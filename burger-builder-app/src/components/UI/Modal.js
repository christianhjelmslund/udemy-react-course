import React from "react";
import Backdrop from "./Backdrop"
import styles from "./Modal.module.css"

const Modal = props => {

    return (props.show ?
        <React.Fragment>
            <Backdrop show={props.show} clicked={props.clicked}> </Backdrop>
            <div className={styles.Modal}>
                {props.children}
            </div>
        </React.Fragment> : null)
}

export default React.memo(Modal, ((prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
));