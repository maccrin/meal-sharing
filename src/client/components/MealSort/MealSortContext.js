import React, {
    useReducer,
    createContext,
    useContext,
} from "react";

export const MealSortContext = createContext();
const sortedMealReducer = (state, action) => {
    console.log(action.payload);
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
            throw new Error()
    }
};
export const SortedMealProvider = ({ children }) => {
    let result;
    const [sortedtCurrentMeals, dispatchMeal] = useReducer(sortedMealReducer, {
        data: [],
        isLoading: false,
        isError: false,
    });


    const fetchMeal = async (fetchUrl) => {

        try {
            const res = await fetch(fetchUrl);
            if (res.ok) {
                const result = await res.json();
                dispatchMeal({ type: "Load", payload: result })

            }
        } catch {
            () => dispatchMeal({ type: "Failures" })
        }
    }
    return (
        <MealSortContext.Provider value={{ fetchMeal, sortedtCurrentMeals, dispatchMeal }}> {children}</MealSortContext.Provider >
    );
};
export function useSortedMealContext() {
    return useContext(MealSortContext);
}
