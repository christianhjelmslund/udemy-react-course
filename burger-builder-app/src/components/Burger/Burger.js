import React from "react";
import styles from "./Burger.module.css";
import Ingredient from "./Ingredient";

const burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients).map(
        (ingredientKey) => {
            const times = props.ingredients[ingredientKey];
            return [...Array(times)].map((_, i) => {
                return <Ingredient key={ingredientKey + i} type={ingredientKey}/>;
            });
        }
    ).reduce((array, element) => {
            return array.concat(element)
    }, []);

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p> Please add some ingredients </p>
    }

    return (
        <div className={styles.Burger}>
            <Ingredient type="bread-top"/>
            {transformedIngredients}
            <Ingredient type="bread-bottom"/>
        </div>
    );
};

export default burger;
