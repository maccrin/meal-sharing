import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useMealContext } from "../Context/MealContext";
import './reserve.css'

const Reservation = () => {
    const [error, setError] = useState(false);
    const INITIAL_STATE = {
        number_of_guests: 0,
        contact_phone_number: '',
        contact_name: '',
        contact_email: ''
    }
    const [form, setForm] = useState(INITIAL_STATE);
    const { id, available_slot } = useParams();
    const { currentMeals, dispatchMeals, getMeal } = useMealContext();
    const meal = getMeal(id);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }
    const handleChangeMaxSlot = (e) => {
        if (e.target.value === available_slot) alert(`Maximum available slot is ${available_slot}`)
        setForm({ ...form, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        form.meal_id = meal.id;
        form.created_date = new Date().toJSON().slice(0, 10)
        console.log(form.created_date)
        try {
            const response = await fetch(`api/reserve`, {
                method: 'POST',
                body: JSON.stringify(form),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            const data = await response.json();
            alert(`Meal Booked`);
            console.log(data)
            setForm(INITIAL_STATE)
        }
        catch (e) {
            setError(true);
            alert(`${e.message}`)
            return e.message;
        }

    }
    return (
        <div className="wrapper">{error && alert('Resquest is not sucessful')}
            {meal ? (
                <form onSubmit={handleSubmit}>
                    <fieldset>
                        <legend><span>Reservation Form</span></legend>
                        <div className="reserveform">
                            <label htmlFor="number_of_guests">Number Of Guests</label>
                            <input type="number" min={1} max={available_slot} required
                                id="number_of_guests" value={form.number_of_guests} onChange={handleChangeMaxSlot}></input>
                            <label htmlFor="contact_phone_number">Contact Phone Number</label>
                            <input type="tel" required placeholder="123-4567-8901"
                                id="contact_phone_number" value={form.contact_phone_number} onChange={handleChange}></input>
                            <label htmlFor="contact_name">Contact Person</label>
                            <input type="text" required
                                id="contact_name" value={form.contact_name} onChange={handleChange}></input>
                            <label htmlFor="contact_email">Contact Person's Email</label>
                            <input type="email"
                                id="contact_email" value={form.contact_email} onChange={handleChange}></input>
                        </div>
                        <button className="booked" type="submit">Book This Meal</button>
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
export default Reservation