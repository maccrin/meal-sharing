
import "./reviewpg.css";
import React, { useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import './reviewpg.css';
const MealReview = () => {
    const [rating, setRating] = useState(0);
    const [star, setStar] = useState(0);
    const [reviewMeal, setReviewMeal] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true)
    const history = useHistory();
    const abortController = new AbortController();
    useEffect(() => {
        (async () => {
            try {
                const data = await fetch("api/meals?review=avg", {
                    signal: abortController.signal,
                });
                if (data.ok) {
                    setLoading(true);
                    const result = await data.json();
                    const output = result.map((eachMeal) =>
                        Object.assign({}, eachMeal, {
                            avg_review: parseFloat(eachMeal.avg_review),
                        })
                    );
                    setReviewMeal(output);
                    setLoading(false);
                }
            } catch (e) {
                setError(true);
                setLoading(false);
                return e.message;
            }
        })();
        return () => {
            abortController.abort();
        };
    }, []);

    return (
        <div>
            {error && <p>Something went wrong</p>}
            <div className="reviewheading">
                <h2>Average Review Of Each Meal</h2>
            </div>
            <div className="reviewcontainer">
                {loading ? (
                    <p>...Loading</p>
                ) : (
                    <ul className="reviewlist">
                        {reviewMeal.map((eachMeal) => {
                            return (
                                <li className="eachreview" key={eachMeal.id}>
                                    <Link to={`/review/${eachMeal.id}`}>
                                        {" "}
                                        <b>{eachMeal.title}</b>
                                        {eachMeal.total_review > 1 ? (
                                            <p>{`${eachMeal.total_review} reviews`}</p>
                                        ) : (
                                            <p>{`${eachMeal.total_review} review`}</p>
                                        )}
                                        <p>AVG Rating:{eachMeal.avg_review}</p>
                                        {Array.of(1, 2, 3, 4, 5).map((eachStar) => {
                                            return (
                                                <button
                                                    type="button"
                                                    key={eachStar}
                                                    className={
                                                        eachStar <= eachMeal.avg_review ? "on" : "off"
                                                    }
                                                >
                                                    <span className="star">&#9733;</span>
                                                </button>
                                            );
                                        })}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default MealReview;



