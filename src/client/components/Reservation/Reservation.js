import React, { useState, } from "react";
import { useParams, Redirect, useHistory, useLocation } from "react-router-dom";
import { useMealContext } from "../Context/MealContext";
import './reserve.css';
const Reservation = () => {
    const [error, setError] = useState(false);
    const INITIAL_STATE = {
        number_of_guests: 0,
        contact_phone_number: '',
        contact_name: '',
        contact_email: ''
    }
    const history = useHistory();
    const location = useLocation();
    if (!location.state) {
        return <Redirect to="/" />
    }
    const availableSlot = (location.state.data)
    const { getMeal } = useMealContext();
    const [form, setForm] = useState(INITIAL_STATE);
    const { id } = useParams();
    const meal = getMeal(id);
    const handleChange = (e) => {
        setForm({ ...form, [e.target.id]: e.target.value })
    }
    const handleChangeMaxSlot = (e) => {
        if (e.target.value === 3)
            alert('You Reached to Maximum Slots')
        setForm({ ...form, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        form.meal_id = meal.id;
        form.created_date = new Date().toJSON().slice(0, 10)
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
            setForm(INITIAL_STATE);
        }
        catch (e) {
            setError(true);
            return e.message;
        }

        history.push("/meals")
    }
    return (
        <div className="wrapper1">{error && alert('Resquest is not sucessful')}
            {meal ? (
                <form onSubmit={handleSubmit}>
                    <fieldset className="reservfielsd">
                        <legend><span>Reservation Form</span></legend>
                        <div className="reserveform">
                            <label htmlFor="number_of_guests">Number Of Guests</label>
                            <input type="number" min={1} max={availableSlot} required
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
                <h3>There is no Meal for this specific id</h3>
            )}
        </div>
    )
}
export default Reservation