import React, { useEffect, useState, useReducer, createContext } from "react";
export const MealContext = createContext();

const mealReducer = (state, action) => {
  console.log(state, action.type, action.payload);
  switch (action.type) {
    case "FETCH-INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "SORT":
      return {
        ...state,
        data: action.payload.sort(
          (meal1, meal2) => parseInt(meal1.price) - parseInt(meal2.price)
        ),
      };
    case "SUCCESS":
      return {
        ...state,
        data: action.payload,
        isLoading: false,
        isError: false,
      };
    case "Failures":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};
const MealProvider = ({ children }) => {
  const [currentMeals, dispatchMeals] = useReducer(mealReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });

  useEffect(() => {
    (async () => {
      dispatchMeals({ type: "FETCH-INIT" });
      try {
        const data = await fetch("api/meals");
        const result = await data.json();
        console.log(result);
        dispatchMeals({ type: "SUCCESS", payload: result });
      } catch {
        () => dispatchMeals({ type: "Failures" });
      }
    })();
  }, []);

  return (
    <div>
      <MealContext.Provider value={{ currentMeals, dispatchMeals }}>
        {children}
      </MealContext.Provider>
    </div>
  );
};
export { MealProvider };
