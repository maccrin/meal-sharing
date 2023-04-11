import React from "react";
import { Link } from "react-router-dom";
import { useMealContext } from "../Context/MealContext";
import MealSearch from "../MealSearch/MealSearch";
import MealSort from "../MealSort/MealSort";
import { useSortedMealContext } from "../Context/MealSortContext";
import "../Meal/meal.css";
const MealList = () => {
  const { currentMeals } = useMealContext();
  const { sortedtCurrentMeals } = useSortedMealContext();
  if (!currentMeals.data) {
    return <h1>...Loading</h1>;
  }
  let displayMeals;
  sortedtCurrentMeals.data.length > 0
    ? (displayMeals = Array.from(sortedtCurrentMeals.data))
    : (displayMeals = Array.from(currentMeals.data));
  return (
    <div className="container">
      {currentMeals.isError && <p> Something went wrong</p>}
      {sortedtCurrentMeals.isError && <p> Something went wrong</p>}
      <h2 className="head">Click on each meal to get details</h2>
      <MealSearch />
      <MealSort />
      <ul className="meal">
        {displayMeals.map((eachMeal) => (
          <li className="list" key={eachMeal.id}>
            <Link to={`/meals/${eachMeal.id}`}>
              <b>{eachMeal.title}&nbsp;</b>
              <p>{eachMeal.price}Kr</p>
              <p>When: {eachMeal.when.slice(0, 10)}</p>
              <p>Max_Reservation:{eachMeal.max_reservations}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
