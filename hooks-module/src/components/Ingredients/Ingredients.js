import React, {useEffect, useCallback, useReducer, useMemo} from 'react';

import IngredientForm from './IngredientForm';
import IngredientList from './IngredientList';
import Search from './Search';
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../hooks/http-hook";

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
    const {isLoading, error, data, sendRequest, extra, identifier, clearError} = useHttp()

    useEffect(() => {
        if (!isLoading && !error && identifier === 'ADD')
            dispatchIngredients({type: 'ADD', ingredient: {id: data.name, ...extra}})
        else if (!isLoading && !error && identifier === 'REMOVE') {
            dispatchIngredients({type: 'REMOVE', id: extra})
        }
    }, [data, extra, identifier, isLoading, error])

    const filteredIngredientsHandler = useCallback(filteredIngredients => (dispatchIngredients({
            type: 'SET',
            ingredients: filteredIngredients
        }
    )), [])

    const addIngredientHandler = useCallback(ingredient => {
        sendRequest('https://react-hooks-a24de.firebaseio.com/ingredients.json',
            'POST',
            JSON.stringify(ingredient),
            ingredient,
            'ADD'
        )
    }, [sendRequest])

    const removeIngredientHandler = useCallback(id => {
        sendRequest(`https://react-hooks-a24de.firebaseio.com/ingredients/${id}.json`,
            'DELETE',
            null,
            id,
            'REMOVE')
    }, [sendRequest])

    const ingredientList = useMemo(() => {
        return <IngredientList
            ingredients={ingredients}
            onRemoveItem={(id) => removeIngredientHandler(id)}/>
    }, [ingredients, removeIngredientHandler])

    return (
        error ? <ErrorModal onClose={clearError}>{error}</ErrorModal> :
            <div className="App">
                <IngredientForm onAddIngredient={addIngredientHandler} isLoading={isLoading}/>
                <section>
                    <Search onLoadIngredients={filteredIngredientsHandler}/>
                    {ingredientList}
                </section>
            </div>
    );
}

export default Ingredients;
