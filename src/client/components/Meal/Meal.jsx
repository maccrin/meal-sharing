import React, { useContext, useEffect, useState } from "react";
import { Link, useParams, useHistory } from "react-router-dom";
import { useMealContext } from "../Context/MealContext";
import "./meal.css";
const Meal = () => {
  const [availableSlot, setAvailableSlot] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const { currentMeals, dispatchMeals, getMeal } = useMealContext();
  const meal = getMeal(id);
  useEffect(() => {
    (async () => {
      try {
        const data = await fetch("api/meals?availableReservations=true");
        const result = await data.json();
        console.log(result);
        setAvailableSlot(result);
      } catch (e) {
        return e.message;
      }
    })();
  }, [id]);
  const handleReservation = () => {
    const available = availableSlot.find(
      ({ id, available_slot }) => id === meal.id
    );
    if (available) {
      console.log(available.available_slot);
      alert(`Redirect to Reservation Page`);
      history.push(`/reservations/${meal.id}/${available.available_slot}`);
    } else {
      alert(`No Reservation available for this meal`);
      history.push("/meals");
    }
  };

  // if (!meal) {
  //   return history.push("/");
  // }

  return (
    <div className="container">
      {meal ? (
        <>
          <h2>Here is your meal&nbsp;&nbsp;</h2>
          <b>{meal.title}</b>
          <p>Price:{meal.price}</p>
          <p>Description:{meal.description}</p>
          <p>Location:{meal.location}</p>
          <p>Reservation:{meal.max_reservations}</p>
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
