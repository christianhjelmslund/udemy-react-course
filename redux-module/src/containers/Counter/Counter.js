import React, {Component} from 'react';
import {connect} from "react-redux"

import CounterControl from '../../components/CounterControl/CounterControl';
import CounterOutput from '../../components/CounterOutput/CounterOutput';
import * as actionCreators from "../../store/actions/actions"

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
        onIncrementCounter: () => dispatch(actionCreators.increment()),
        onDecCounter: () => dispatch(actionCreators.decrement()),
        onAdd5: () => dispatch(actionCreators.add5()),
        onSubtract5: () => dispatch(actionCreators.sub5()),
        onStoreResult: (counter) => dispatch(actionCreators.storeResult(counter)),
        onDeleteResult: (id) => dispatch(actionCreators.deleteResult(id)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);