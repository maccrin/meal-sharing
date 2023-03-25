import React, { useContext } from "react";
import { Link } from "react-router-dom";
//import Meal from "../Meal/Meal";
import { useMealContext } from "../Context/MealContext";
import "../Meal/meal.css";
const MealList = () => {
  const { currentMeals, dispatchMeals } = useMealContext();
  return (
    <div className="container">
      <h2 className="head">List of Meals</h2>
      <h4>Click on each meal to get details</h4>
      <button
        className="click"
        onClick={() =>
          dispatchMeals({
            type: "SORT",
            payload: currentMeals.data,
          })
        }
      >
        Price Low-To-High
      </button>
      <ul className="meal">
        {currentMeals.data.map((eachMeal) => (
          <li className="list" key={eachMeal.id}>
            <Link to={`/meals/${eachMeal.id}`}>
              {eachMeal.title}-<b>{eachMeal.price}</b>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
