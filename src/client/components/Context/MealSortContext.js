import React, {
    useReducer,
    createContext,
    useContext,
    useState,
    useEffect
} from "react";

export const MealSortContext = createContext();
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
            throw new Error()
    }
};
export const SortedMealProvider = ({ children }) => {
    const [sortKey, setSortKey] = useState("");
    const [sortDir, setSortDir] = useState("");
    let result;
    const [sortedtCurrentMeals, dispatchMeal] = useReducer(sortedMealReducer, {
        data: [],
        isLoading: false,
        isError: false,
    });


    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`api/meals?sortKey=${sortKey}&sortDir=${sortDir}`);
                if (res.ok) {
                    const result = await res.json();
                    dispatchMeal({ type: "Load", payload: result })
                }
            } catch {
                () => dispatchMeal({ type: "Failures" })
            }
        })();
    }, [sortKey, sortDir])

    const handleClick = (e) => {
        console.log(e.target.name, e.target.id)
        setSortKey(e.target.name);
        setSortDir(e.target.id);
    };
    return (
        <MealSortContext.Provider value={{ sortedtCurrentMeals, dispatchMeal, handleClick }}> {children}</MealSortContext.Provider >
    );
};
export function useSortedMealContext() {
    return useContext(MealSortContext);
}
