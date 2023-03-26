import React, {
  useEffect,
  useState,
  useReducer,
  createContext,
  useContext,
} from "react";
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
        // const data = await fetch("api/meals");
        const data = await fetch(`api/meals?title=${searchQuery}`);
        const result = await data.json();
        console.log(result);
        dispatchMeals({ type: "SUCCESS", payload: result });
      } catch {
        () => dispatchMeals({ type: "Failures" });
      }
    })();
  }, [searchQuery]);
  const handleChange = (e) => {
    console.log(e.target.value);
    setSearchQuery(e.target.value);
  };
  const getMeal = (mealId) => {
    console.log(currentMeals);
    //if (!currentMeals) return undefined;
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
