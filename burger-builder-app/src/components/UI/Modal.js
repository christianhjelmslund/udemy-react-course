import React, {Component} from "react";
import Backdrop from "./Backdrop"
import styles from "./Modal.module.css"

class Modal extends Component {
    shouldComponentUpdate(nextProps, nextState, nextContext) {
        return (nextProps.show !== this.props.show || nextProps.children !== this.props.children)
    }

    render() {
        return (this.props.show ?
            <React.Fragment>
                <Backdrop show={this.props.show} clicked={this.props.clicked}> </Backdrop>
                <div className={styles.Modal}>
                    {this.props.children}
                </div>
            </React.Fragment> : null)
    }
}


export default Modal;