import React, {useState, useCallback, useReducer} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";

const ingredientsReducer = (prevIngredients, action) => {
    switch (action.type) {
        case 'SET':
            return action.ingredients
        case 'ADD':
            return [...prevIngredients, action.ingredient]
        case 'REMOVE':
            return prevIngredients.filter(element => element.id !== action.id)
        default:
            throw Error('Should not reach here...')
    }
}

function Ingredients() {

    const [ingredients, dispatchIngredients] = useReducer(ingredientsReducer, [])

    const [isLoading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const filteredIngredientsHandler = useCallback(filteredIngredients => (dispatchIngredients({
            type: 'SET',
            ingredients: filteredIngredients
        }
    )), [])

    const addIngredientHandler = ingredient => {
        setLoading(true)
        fetch('https://react-hooks-a24de.firebaseio.com/ingredients.json', {
            method: 'POST',
            body: JSON.stringify(ingredient),
            headers: {'Content-Type': 'application/json'}
        }).then(response => response.json()).then(responseData => {
            setLoading(false)
            dispatchIngredients({type: 'ADD', ingredient: { id: responseData.name, ...ingredient}})
        }).catch(error => {
            setLoading(false)
            setError("Something went wrong")
        })
    }

    const clearError = () => {
        setError()
    }

    const removeIngredientHandler = id => {
        setLoading(true)
        fetch(`https://react-hooks-a24de.firebaseio.com/ingredients/${id}.json`, {
            method: 'DELETE'
        }).then(() => {
            setLoading(false)
            dispatchIngredients({type: 'REMOVE', id: id})
        }).catch(error => {
            setLoading(false)
            setError("Something went wrong")
        })
    }

    return (
        error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> :
            <div className="App">
                <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading}/>
                <section>
                    <Search onLoadIngredients={filteredIngredientsHandler}/>
                    <IngredientList ingredients={ingredients}
                                    onRemoveItem={(id) => removeIngredientHandler(id)}/>
                </section>
            </div>
    );
}

export default Ingredients;
