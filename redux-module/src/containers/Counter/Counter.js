import React, {Component} from 'react';
import {connect} from "react-redux"

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';

//actions
import * as actionTypes from "../../store/actions"

class Counter extends Component {
    render() {
        return (
            <div>
                <CounterOutput value={this.props.counter}/>
                <CounterControl label="Increment" clicked={this.props.onIncrementCounter}/>
                <CounterControl label="Decrement" clicked={this.props.onDecCounter}/>
                <CounterControl label="Add 5" clicked={this.props.onAdd5}/>
                <CounterControl label="Subtract 5" clicked={this.props.onSubtract5}/>
                <hr/>
                <button onClick={() => this.props.onStoreResult(this.props.counter)}> Store Result!</button>
                <ul>
                    {this.props.result.map(result =>
                        (<li onClick={() => this.props.onDeleteResult(result.id)}
                             key={result.id}>
                            date added {result.id.toString()}: value {result.value}
                        </li>))
                    }
                </ul>
            </div>

        );
    }
}

const mapStateToProps = state => {
    return {
        counter: state.counterReducer.counter,
        result: state.resultsReducer.result
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onIncrementCounter: () => dispatch({type: actionTypes.INCREMENT}),
        onDecCounter: () => dispatch({type: actionTypes.DECREMENT}),
        onAdd5: () => dispatch({type: actionTypes.ADD_5}),
        onSubtract5: () => dispatch({type: actionTypes.SUB_5}),
        onStoreResult: (counter) => dispatch({type: actionTypes.STORE_RESULT, counter: counter}),
        onDeleteResult: (id) => dispatch({type: actionTypes.DELETE_RESULT, id: id}),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);