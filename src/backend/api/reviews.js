const { response, request } = require("express");
const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
    try {
        // knex syntax for selecting things. Look up the documentation for knex for further info
        const titles = await knex("review").select("*");
        response.status(200).json(titles);
    } catch (error) {
        response.status(503).send(`${error.message}`)
    }
});

router.get("/:id", async (request, response) => {
    try {
        const reviewId = parseInt(request.params.id);
        const review = await knex("review")
            .select("title", "description", "meal_id", "stars", "created_date")
            .where({ id: reviewId });
        console.log(review.length)
        review.length ? response.status(200).json({ "expectedReview": review }) : response.status(200).send(`review with id ${reviewId} not found`)

    } catch (error) {
        response.status(503).send(`${error.message}`)
    }
});


router.post("/", async (request, response) => {
    try {
        if (Object.keys(request.body).length === 0) return response.status(400).send(`Provide request body to insert`)
        const meal = await knex("meal")
            .select("id")
            .where({ id: parseInt(request.body.meal_id) })

        if (meal.length === 0) {
            return response.status(404).send(`MealId doesn't exist`)
        }
        const new_review = await knex("review").insert({
            title: request.body.title,
            description: request.body.description,
            meal_id: request.body.meal_id,
            stars: request.body.stars
        })
        response.status(201).json({ NewReview: request.body })

    }
    catch (error) {
        response.status(503).send(`${error.message}`)
    }
});
router.put("/:id", async (request, response) => {
    const reviewId = parseInt(request.params.id);
    try {
        const meal = await knex("meal")
            .select("id")
            .where({ id: parseInt(request.body.meal_id) })
        if (meal.length === 0) {
            return response.status(404).send(`MealId doesn't exist`)
        }
        const updatedReview = await knex('review')
            .where({ id: reviewId })
            .update({
                description: request.body.description,
                title: request.body.title,
                meal_id: request.body.meal_id,
                stars: request.body.stars,
                created_date: request.body.created_date
            })
        updatedReview ? response.status(200).json({ Updatedrecord: request.body }) : response.status(404).send(`ID doesn't exist`)
    }
    catch (e) {
        response.status(503).send(`${error.message}`)
    }
})
router.delete("/:id", async (request, response) => {
    try {
        const reviewId = parseInt(request.params.id);
        const deletedRecord = await knex("review")
            .where({ id: reviewId })
            .del();
        deletedRecord ? response.status(200).json({ DeletedrecordId: deletedRecord }) :
            response.status(404).json({ message: "Record not found" });
    }
    catch (error) {
        response.status(503).send(`${error.message}`)
    }
});

module.exports = router;
