// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import "./reviewpg.css";
// const MealReview = () => {
//     const [rating, setRating] = useState(0);
//     const [star, setStar] = useState(0);
//     const [reviewMeal, setReviewMeal] = useState([]);
//     const [error, setError] = useState(false);
//     const [loading, setLoading] = useState(true);
//     const abortController = new AbortController();
//     useEffect(() => {
//         (async () => {
//             try {
//                 const data = await fetch("api/meals?review=avg", {
//                     signal: abortController.signal,
//                 });
//                 if (data.ok) {
//                     setLoading(true);
//                     const result = await data.json();
//                     const output = result.map((eachMeal) =>
//                         Object.assign({}, eachMeal, {
//                             avg_review: parseFloat(eachMeal.avg_review),
//                         })
//                     );
//                     setReviewMeal(output);
//                     setLoading(false);
//                 }
//             } catch (e) {
//                 setError(true);
//                 setLoading(false);
//                 return e.message;
//             }
//         })();
//         return () => {
//             abortController.abort();
//         };
//     }, []);

//     return (
//         <div>
//             {error && <p>Something went wrong</p>}
//             <div className="reviewheading">
//                 <h2>Average Review Of Each Meal</h2>
//             </div>
//             <div className="reviewcontainer">
//                 {loading ? (
//                     <p>...Loading</p>
//                 ) : (
//                     <ul className="reviewlist">
//                         {reviewMeal.map((eachMeal) => {
//                             return (
//                                 <li className="eachreview" key={eachMeal.id}>
//                                     <Link to={`/review/${eachMeal.id}`}>
//                                         {" "}
//                                         <b>{eachMeal.title}</b>
//                                         {eachMeal.total_review > 1 ? (
//                                             <p>{`${eachMeal.total_review} reviews`}</p>
//                                         ) : (
//                                             <p>{`${eachMeal.total_review} review`}</p>
//                                         )}
//                                         <p>AVG Rating:{eachMeal.avg_review}</p>
//                                         {Array.of(1, 2, 3, 4, 5).map((eachStar) => {
//                                             return (
//                                                 <button
//                                                     type="button"
//                                                     key={eachStar}
//                                                     className={
//                                                         eachStar <= eachMeal.avg_review ? "on" : "off"
//                                                     }
//                                                 >
//                                                     <span className="star">&#9733;</span>
//                                                 </button>
//                                             );
//                                         })}
//                                     </Link>
//                                 </li>
//                             );
//                         })}
//                     </ul>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default MealReview;
import React, { useEffect, useState } from "react";
import { useParams, useHistory, Redirect } from "react-router-dom";
import { useContext } from "react";
import { useMealContext } from "../Context/MealContext";
import EachMealReview from "../MealReview/MealReviewDisplay";
import "./meal.css";
const Meal = () => {
    const [availableSlot, setAvailableSlot] = useState([]);
    const { id } = useParams();
    const history = useHistory();
    const { getMeal } = useMealContext();
    const meal = getMeal(id);

    if (!meal) {
        return <Redirect to="/" />;
    }
    const abortController = new AbortController();
    useEffect(() => {
        (async () => {
            try {
                const res = await fetch(`api/meals/${id}/reservations`, {
                    signal: abortController.signal,
                });
                if (res.ok) {
                    const result = await res.json();

                    setAvailableSlot(result[0].available_slot);
                }
            } catch (e) {
                return e.message;
            }
        })();
        return () => {
            abortController.abort();
        };
    }, [id]);
    const handleReservation = () => {
        if (availableSlot > 0) {
            alert(`Redirect to Reservation Page`);

            history.push({
                pathname: `/reservations/${meal.id}`,
                state: { data: `${availableSlot}` },
            });

        } else {
            alert(`No Reservation available for this meal`);
            history.push("/meals");
        }
    };

    if (!meal) {
        return <Redirect to="/" />;
    }

    return (
        <div className="container">
            {meal ? (
                <>
                    <fieldset>
                        <legend> Here Is Your Meal Card</legend>
                        <b>{meal.title}</b>
                        <p>Price:{meal.price}</p>
                        <p>Description:{meal.description}</p>
                        <p>Location:{meal.location}</p>
                        {availableSlot > 0 ? (
                            <p>{` Available Slot ${availableSlot}`}</p>
                        ) : (
                            <p>{`No Slots are avilable`}</p>
                        )}
                        <EachMealReview meal={meal} />
                    </fieldset>
                    {/* <h2>Here is your Meal Card&nbsp;&nbsp;</h2>
                    <b>{meal.title}</b>
                    <p>Price:{meal.price}</p>
                    <p>Description:{meal.description}</p>
                    <p>Location:{meal.location}</p>
                    {availableSlot > 0 ? (
                        <p>{` Available Slot ${availableSlot}`}</p>
                    ) : (
                        <p>{`No Slots are avilable`}</p>
                    )} */}
                    <EachMealReview meal={meal} />
                    <>
                        <div className="mealroute">
                            <button className="reserve" onClick={handleReservation}>
                                Book the Meal
                            </button>
                            <button
                                className="reserve"
                                onClick={() => {
                                    history.push(`/review/${meal.id}`);
                                }}
                            >
                                Leave a Review
                            </button>
                        </div>
                    </>
                </>
            ) : (
                <h3>There is no meal for this specific id</h3>
            )}
        </div>
    );
};

export default Meal;