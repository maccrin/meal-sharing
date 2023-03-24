import React, { useContext, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMealContext } from "../Context/MealContext";
import FaStar from "react-icons/fa";
import './review.css'

const Review = () => {
    const [rating, setRating] = useState(0)
    const [error, setError] = useState(false);
    const INITIAL_STATE = {
        title: '',
        description: ''
    }
    const [form, setForm] = useState(INITIAL_STATE);
    const { id } = useParams();
    const { currentMeals, dispatchMeals, getMeal } = useMealContext();
    const meal = getMeal(id);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        form.meal_id = meal.id;
        form.created_date = new Date().toJSON().slice(0, 10)
        console.log(form.created_date)
        form.stars = rating;
        try {
            console.log('hello')
            const response = await fetch(`api/reviews`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            console.log(data)
            setForm(INITIAL_STATE)
            alert(`Review Sent`)
        }
        catch (e) {
            setError(true);
            alert(`${e.message}`)
            return e.message;
        }

    }
    return (
        <div className="wrapper">
            {error && alert('Resquest is not sucessful')}
            {meal ? (
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend><span>Review Form</span></legend>
                        <div className="reviewform">
                            <label htmlFor="title" ></label>
                            <input type="text" required
                                id="title" value={form.title} placeholder="Review Comment" onChange={handleChange}></input>
                            <label htmlFor="description"></label>
                            <input type="text" required
                                id="description" placeholder="Describe in details" value={form.description} onChange={handleChange}></input>
                        </div>
                        {Array.of(1, 2, 3, 4, 5).map((eachStar) => {
                            return (
                                <button type="button"
                                    key={eachStar}
                                    className={eachStar <= rating ? "on" : "off"}
                                    onClick={() => setRating(eachStar)}>
                                    <span className="star">&#9733;</span>
                                </button>
                            )
                        })}

                        <button className="reviewbutton" type="submit">Leave FeedBack</button>
                    </fieldset>
                </form>
            ) : (
                <h3>There is no meal for this specific id</h3>
            )}
            <Link to={`/`}>
                Go To Home
            </Link>
        </div>
    )
}

export default Review;