import React from "react";
import { useSortedMealContext } from "../Context/MealSortContext";
import "../MealSort/mealsort.css";
const MealSort = () => {
    const { fetchMeal } = useSortedMealContext();
    return (
        <>
            <div className="sort">
                <div className="pricesort">
                    <button name="PriceAesc"
                        className="sortbutton"
                        onClick={() => fetchMeal(`api/meals?sortKey=price&sortDir=asc`)}>
                        Price&#x2191;
                    </button>
                    <button name="PriceDsc"
                        className="sortbutton"
                        onClick={() => fetchMeal(`api/meals?sortKey=price&sortDir=desc`)}>
                        Price&#x2193;
                    </button>
                </div>
                <div className="timesort">
                    <button name="WhenAesc"
                        className="sortbutton"
                        onClick={() => fetchMeal(`api/meals?sortKey=when`)}
                    >
                        When&#x2191;
                    </button>
                    <button name="WhenDsc"
                        className="sortbutton"
                        onClick={() => fetchMeal(`api/meals?sortKey=when&sortDir=desc`)}>
                        When&#x2193;
                    </button>
                </div>
                <div className="reservationsort">
                    <button name="Max_Reservation_Aesc"
                        className="sortbutton"
                        onClick={() => fetchMeal(`api/meals?sortKey=max_reservations`)}>
                        Max_Reserve&#x2191;
                    </button>
                    <button name="Max_Reservation_Dsc"
                        className="sortbutton"
                        onClick={() => fetchMeal(`api/meals?sortKey=max_reservations&sortDir=desc`)}
                    > Max_Reserve&#x2193;
                    </button>
                </div>
            </div>
        </>
    )
}
export default MealSort