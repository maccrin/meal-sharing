import React, { useContext, useEffect, useState } from "react";
import { useMealContext } from "../Context/MealContext";
import "../MealSearch/mealsearch.css";
const MealSearch = () => {
    const { currentMeals, searchQuery, handleChange } = useMealContext();
    console.log(currentMeals.data)

    useEffect(() => {

    })
    return (
        <div>
            <label className="search" htmlFor="search">Search Meal </label>
            <input className="searchmeal" id="search" value={searchQuery} onChange={handleChange} type="text"></input>
        </div>
    )
}
export default MealSearch;