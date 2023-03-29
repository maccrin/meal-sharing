import React from "react";
import { useMealContext } from "../Context/MealContext";
import "../MealSearch/mealsearch.css";
const MealSearch = () => {
    const { currentMeals, searchQuery, handleChange } = useMealContext();
    if (!currentMeals.data) {
        return <h1>...Loading</h1>;
    }
    return (
        <>
            {currentMeals.isError && <p> Something went wrong</p>}
            < div >
                <label className="search" htmlFor="search">Search Meal </label>
                <input className="searchmeal" id="search" value={searchQuery} onChange={handleChange} type="text"></input>
            </div >
        </>
    )
}
export default MealSearch;