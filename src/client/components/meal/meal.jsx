import React from "react";
import { MealContext } from "../Context/MealContext";
const Meal = ({ value }) => {
  return (
    <div>
      <p>Title:{value.title}</p>
      <p>Price:{value.price}</p>
      <p>Description:{value.description}</p>
    </div>
  );
};

export default Meal;
