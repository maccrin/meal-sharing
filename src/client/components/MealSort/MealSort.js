import React from "react";
import { useMealContext } from "../Context/MealContext";
import "../MealSort/mealsort.css";
import "../MealSort/mealsort.css";
const MealSort = () => {
    const { handleClick } = useMealContext();
    return (
        <>
            <div className="sort">
                <div className="pricesort">
                    <button name="price"
                        id="asc"
                        className="sortbutton"
                        onClick={handleClick}>
                        Price&#x2191;
                    </button>
                    <button name="price"
                        id="desc"
                        className="sortbutton"
                        onClick={handleClick}>
                        Price&#x2193;
                    </button>
                </div>
                <div className="timesort">
                    <button name="when"
                        id="asc"
                        className="sortbutton"
                        onClick={handleClick}>
                        When&#x2191;
                    </button>
                    <button name="when"
                        id="desc"
                        className="sortbutton"
                        onClick={handleClick}>
                        When&#x2193;
                    </button>
                </div>
                <div className="reservationsort">
                    <button name="max_reservations"
                        id="asc"
                        className="sortbutton"
                        onClick={handleClick}>
                        Max_Reserve&#x2191;
                    </button>
                    <button name="max_reservations"
                        id="desc"
                        className="sortbutton"
                        onClick={handleClick}>
                        Max_Reserve&#x2193;
                    </button>
                </div>
            </div>
        </>
    )
}
export default MealSort