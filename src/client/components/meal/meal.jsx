import React, { useEffect, useState } from "react";
import "./meal.css";
const Meal = () => {
  const [meal, setmeal] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const data = await fetch("api/meals");
      const result = await data.json();
      setmeal(result);
      setIsLoading(false);
    })();
  }, []);

  return (
    <div className="menu">
      {meal ? (
        <ul>
          {meal.map((eachMeal) => {
            return (
              <li className="meal" key={eachMeal.id}>
                <p>Meal:{eachMeal.title}</p>
                <p>Desp:{eachMeal.description}</p>
                <p>Price:{eachMeal.price}</p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>There is no meal</p>
      )}
    </div>
  );
};
export default Meal;
