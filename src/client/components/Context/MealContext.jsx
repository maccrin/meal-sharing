import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from "react";
export const MealContext = createContext();
const mealReducer = (state, action) => {
  switch (action.type) {
    case "FETCH-INIT":
      return {
        ...state,
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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentMeals, dispatchMeals] = useReducer(mealReducer, {
    data: [],
    isLoading: false,
    isError: false,
  });
  useEffect(() => {
    (async () => {
      dispatchMeals({ type: "FETCH-INIT" });
      try {
        const data = await fetch(`api/meals?title=${searchQuery}`);
        const result = await data.json();
        dispatchMeals({ type: "SUCCESS", payload: result });
      } catch {
        () => dispatchMeals({ type: "Failures" });
      }
    })();
  }, [searchQuery]);
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const getMeal = (mealId) => {
    if (!currentMeals.data || isNaN(mealId)) return undefined;
    return currentMeals.data.find((aMeal) => aMeal.id === Number(mealId));
  };
  const contextState = {
    currentMeals,
    dispatchMeals,
    getMeal,
    searchQuery,
    handleChange,
  };
  return (
    <MealContext.Provider value={contextState}>{children}</MealContext.Provider>
  );
};
export function useMealContext() {
  return useContext(MealContext);
}
