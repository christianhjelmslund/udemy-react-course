import React, {useState, useEffect, useRef} from 'react';

import Card from '../UI/Card';
import './Search.css';

const Search = React.memo(props => {

    const {onLoadIngredients} = props
    const [inputFilter, setInputFilter] = useState('')
    const inputFilterRef = useRef()

    useEffect(() => {
        const timer = setTimeout(() => {
            if (inputFilterRef.current.value === inputFilter) {
            const query = inputFilter.length === 0 ? '' : `?orderBy="title"&equalTo="${inputFilter}"`
            fetch('https://react-hooks-a24de.firebaseio.com/ingredients.json' + query)
                .then(response => response.json())
                .then(responseData => {
                    const ingredients = []
                    for (const key in responseData) {
                        ingredients.push({
                            id: key,
                            amount: responseData[key].amount,
                            title: responseData[key].title
                        })
                    }
                    onLoadIngredients(ingredients)
                })
            }
        }, 500)
        return (() => clearTimeout(timer))
    }, [inputFilter, onLoadIngredients])

    return (
        <section className="search">
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
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
