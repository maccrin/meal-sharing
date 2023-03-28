import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { useMealContext } from "../Context/MealContext";
import MealSearch from "../MealSearch/MealSearch";
import MealSort from "../MealSort/MealSort";
import { useSortedMealContext } from "../MealSort/MealSortContext";
import "../Meal/meal.css";
const MealList = () => {
  const { currentMeals } = useMealContext();
  const { sortedtCurrentMeals } = useSortedMealContext();
  if (!currentMeals.data) {
    return <h1>...Loading</h1>;
  }
  return (
    <div className="container">
      {currentMeals.isError && <p> Something went wrong</p>}
      {sortedtCurrentMeals.isError && <p> Something went wrong</p>}
      <h2 className="head">Click on each meal to get details</h2>
      <MealSearch />
      <MealSort />
      <ul className="meal">
        {sortedtCurrentMeals.data.length > 0
          ? sortedtCurrentMeals.data.map((eachMeal) => (
              <li className="list" key={eachMeal.id}>
                <Link to={`/meals/${eachMeal.id}`}>
                  Title: {eachMeal.title}&nbsp; &nbsp;
                  <b>Price:{eachMeal.price}Kr&nbsp; &nbsp;</b>
                  When: {eachMeal.when}&nbsp; &nbsp;
                  <b> Max_Reservation: {eachMeal.max_reservations}</b>
                </Link>
              </li>
            ))
          : currentMeals.data.map((eachMeal) => (
              <li className="list" key={eachMeal.id}>
                <Link to={`/meals/${eachMeal.id}`}>
                  <b>Title: {eachMeal.title}&nbsp;</b>
                  <p>Price:{eachMeal.price}Kr</p>
                  <p>When: {eachMeal.when}</p>
                  <p>Max_Reservation:{eachMeal.max_reservations}</p>
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default MealList;
