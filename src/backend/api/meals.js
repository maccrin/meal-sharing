const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    // knex syntax for selecting things. Look up the documentation for knex for further info
    const titles = await knex("meal").select("*");
    response.json(titles);
  } catch (error) {
    throw error;
  }
});

router.get("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    const meal = await knex("meal")
      .select("title", "description", "location", "when", "price", "created_date")
      .where({ id: mealId });
    meal.length === 0 ? response.status(404).send(`meal with id ${mealId} not found`) : response.status(200).json({ "expectedmeal": meal });

  } catch (error) {
    response.status(503).send(`${error.message}`)
  }
});


router.post("/", async (request, response) => {
  try {
    const new_meal = await knex("meal").insert({
      title: request.body.title,
      description: request.body.description,
      location: request.body.location,
      when: request.body.when,
      max_reservations: request.body.max_reservations,
      price: request.body.price,
      created_date: request.body.created_date
    })
    response.status(201).json({ NewMeal: new_meal })

  }
  catch (error) {
    response.status(503).send('Not able to create new meal')
  }
});
router.put("/:id", async (req, res) => {
  const mealId = parseInt(req.params.id);
  try {
    const updatedMeal = await knex('meal')
      .where({ id: mealId })
      .update({ description: req.body.description })
    updatedMeal ? res.status(200).json({ MealUpdated: mealId }) : res.status(404).send(`ID doesn't exist`)
  }
  catch (e) {
    res.status(503).send(`Something went wrong`)
  }
})
router.delete("/:id", async (request, response) => {
  try {
    const mealId = parseInt(request.params.id);
    const deletedRecord = await knex("meal")
      .where({ id: mealId })
      .del();
    deletedRecord ? response.status(200).json({ DeletedrecordId: deletedRecord }) :
      response.status(404).json({ message: "Record not found" });
  }
  catch (error) {
    response.status(503).send(`Couldn't Delete`)
  }
});

module.exports = router;
