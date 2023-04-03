const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const titles = await knex("reservation").select("*");
        response.json(titles);
    } catch (error) {
        throw error;
    }
});

router.get("/:id", async (request, response) => {
    try {
        const reserveId = parseInt(request.params.id);
        const reserve = await knex("reservation")
            .select("id", "number_of_guests", "meal_id", "created_date", "contact_phone_number", "contact_name", "contact_email")
            .where({ id: reserveId });
        reserve.length === 0 ? response.status(404).send(`reservation with id ${reserveId} not found`) : response.status(200).json({ "expectedReservation": reserve });

    } catch (error) {
        response.status(503).send(`${error.message}`)
    }
});


router.post("/", async (request, response) => {
    try {
        const new_reserve = await knex("reservation").insert({
            number_of_guests: request.body.number_of_guests,
            meal_id: request.body.meal_id,
            created_date: request.body.created_date,
            contact_phone_number: request.body.contact_phone_number,
            contact_name: request.body.contact_name,
            contact_email: request.body.contact_email
        })
        response.status(201).json({ NewReservation: new_reserve })
    }
    catch (error) {
        response.status(503).send('Not able to create new reservation')
    }
});
router.put("/:id", async (req, res) => {
    const reserveId = parseInt(req.params.id);
    try {
        const updatedReservation = await knex('reservation')
            .where({ id: reserveId })
            .update({
                contact_name: req.body.contact_name,
                number_of_guests: req.body.number_of_guests,
                contact_phone: req.body.conact_phone
            })
        updatedReservation ? res.status(200).json({ UpdatedReservation: updatedReservation }) : res.status(404).send(`ID doesn't exist`)
    }
    catch (e) {
        res.status(503).send(`Something went wrong`)
    }
})
router.delete("/:id", async (request, response) => {
    try {
        const reserveId = parseInt(request.params.id);
        const deletedRecord = await knex("reservation")
            .where({ id: reserveId })
            .del();
        deletedRecord ? response.status(200).json({ DeletedrecordId: deletedRecord }) :
            response.status(404).json({ message: "Record not found" });
    }
    catch (error) {
        response.status(503).send(`Couldn't Delete`)
    }
});

module.exports = router;

module.exports = router;

