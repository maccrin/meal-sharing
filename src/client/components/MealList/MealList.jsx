import React, { useContext } from "react";
import Meal from "../Meal/Meal";
import { MealContext } from "../Context/MealContext";
import "../Meal/meal.css";
const MealList = () => {
  const usingContext = useContext(MealContext);
  return (
    <div className="container">
      <button
        className="click"
        onClick={() =>
          usingContext.dispatchMeals({
            type: "SORT",
            payload: usingContext.currentMeals.data,
          })
        }
      >
        Price Low-To-High
      </button>
      <ul className="meal">
        {usingContext.currentMeals.data.map(({ id, ...eachResult }) => (
          <li key={id}>
            <Meal value={eachResult} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MealList;
