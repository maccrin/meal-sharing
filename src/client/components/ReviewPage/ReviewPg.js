import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './reviewpg.css';
const MealReview = () => {
    const [rating, setRating] = useState(0)
    const [reviewMeal, setReviewMeal] = useState([])
    const history = useHistory();
    useEffect(() => {
        (async () => {
            try {
                const data = await fetch("api/meals?review=avg");
                const result = await data.json()
                const output = result.map(eachMeal => (
                    Object.assign({}, eachMeal, { avg_review: Math.ceil(parseFloat(eachMeal.avg_review).toFixed(2)) })
                ))
                console.log(output)
                setReviewMeal(output);
            }
            catch (e) {
                return e.message;
            }
        })();
    }, []);

    return (
        <div >
            <div className="reviewheading">
                <h1 >
                    Meals Review
                </h1></div>
            <div className="reviewcontainer">
                <ul className="reviewlist">
                    {
                        reviewMeal.map((eachMeal) => {
                            return (<li className="eachreview" key={eachMeal.id}>
                                <b>{eachMeal.title}</b>
                                {eachMeal.total_review > 1 ? <p>{`${eachMeal.total_review} reviews`}</p> : <p>{`${eachMeal.total_review} review`}</p>}
                                <p>AVG Rating:{eachMeal.avg_review}</p>
                                {Array.of(1, 2, 3, 4, 5).map((eachStar) => {
                                    return (
                                        <button type="button"
                                            key={eachStar}
                                            className={eachStar <= eachMeal.avg_review ? "on" : "off"}>

                                            <span className="star">&#9733;</span>
                                        </button>)
                                })}
                            </li>)
                        })
                    }
                </ul>
            </div>
        </div>
    )

}

export default MealReview;