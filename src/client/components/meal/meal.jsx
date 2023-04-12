import { useParams, useHistory, Redirect } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import { useMealContext } from "../Context/MealContext";
import EachMealReview from "../MealReview/MealReview";
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
          console.log(result);
          setAvailableSlot(result[0].available_slot);
          console.log(result[0].available_slot);
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
