import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import ErrorModal from "../UI/ErrorModal";
import './Search.css';
import useHttp from "../hooks/http-hook";

const Search = React.memo(props => {

    const {isLoading, error, data, sendRequest, clearError} = useHttp()
    const {onLoadIngredients} = props
    const [inputFilter, setInputFilter] = useState('')
    const inputFilterRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputFilterRef.current.value === inputFilter) {
                const query = inputFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${inputFilter}"`
                sendRequest('https://react-hooks-a24de.firebaseio.com/ingredients.json' + query, 'GET')
            }
        }, 500)
        return (() => clearTimeout(timer))
    }, [inputFilter, inputFilterRef, sendRequest])

    useEffect(() => {
        if (!isLoading && !error && data) {
            const ingredients = []
            for (const key in data) {
                ingredients.push({
                    id: key,
                    amount: data[key].amount,
                    title: data[key].title
                })
            }
            onLoadIngredients(ingredients)
        }

    }, [data, isLoading, error, onLoadIngredients])

    return (
        <section className="search">
            {error ? <ErrorModal>{error}</ErrorModal>: clearError }
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    { isLoading ? <span>Loading...</span> : null }
                    <input type="text"
                           ref={inputFilterRef}
                           value={inputFilter}
                           onChange={event => setInputFilter(event.target.value)}/>
                </div>
            </Card>
        </section>
    );
});

export default Search;
