import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from "react";
export const MealContext = createContext();
console.log("hello");
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
        isLoading: true,
        isError: false,
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
export const MealProvider = ({ children }) => {
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
        dispatchMeals({ type: "SUCCESS", payload: result });
      } catch {
        () => dispatchMeals({ type: "Failures" });
      }
    })();
  }, []);
  const getMeal = (mealId) => {
    console.log(currentMeals);
    //if (!currentMeals) return undefined;
    return currentMeals.data.find((aMeal) => aMeal.id === Number(mealId));
  };
  const contextState = { currentMeals, dispatchMeals, getMeal };
  return (
    <MealContext.Provider value={contextState}>{children}</MealContext.Provider>
  );
};
export function useMealContext() {
  return useContext(MealContext);
}
