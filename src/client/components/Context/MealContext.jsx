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
const sortedMealReducer = (state, action) => {
  switch (action.type) {
    case "Load":

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
  const [sortKey, setSortKey] = useState("");
  const [sortDir, setSortDir] = useState("");
  let result;
  const [sortedtCurrentMeals, dispatchSortedMeal] = useReducer(
    sortedMealReducer,
    {
      data: [],
      isLoading: false,
      isError: false,
    }
  );
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
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `api/meals?sortKey=${sortKey}&sortDir=${sortDir}`
        );
        if (res.ok) {
          const result = await res.json();
          dispatchSortedMeal({ type: "Load", payload: result });
        }
      } catch {
        () => dispatchSortedMeal({ type: "Failures" });
      }
    })();
  }, [sortKey, sortDir]);

  const handleClick = (e) => {
    setSortKey(e.target.name);
    setSortDir(e.target.id);
  };

    if (!currentMeals.data) return undefined;
    return currentMeals.data.find((aMeal) => aMeal.id === Number(mealId));
  };


  const contextState = {
    currentMeals,
    dispatchMeals,
    getMeal,
    searchQuery,
    handleChange,
    sortedtCurrentMeals,
    dispatchSortedMeal,
    handleClick,
  };
  return (
    <MealContext.Provider value={contextState}>{children}</MealContext.Provider>
  );
};
export function useMealContext() {
  return useContext(MealContext);
}
