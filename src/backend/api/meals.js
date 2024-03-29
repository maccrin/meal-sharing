const express = require("express");
const router = express.Router();
const knex = require("../database");

router.get("/", async (request, response) => {
  try {
    let query = knex('meal')
    if ("maxPrice" in request.query) {
      const maxPrice = parseInt(request.query.maxPrice);
      if (!isNaN(maxPrice)) query = query.where("price", "<", maxPrice)
      else {
        return response.status(404).send(`please provide maxprice of the meal`)
      }
    }
    if ("title" in request.query) {
      const title = request.query.title;

      if (title) query = query.where("title", "like", `%${title}%`)
      else {
        query = knex('meal')
      }

    }

    if ("dateAfter" in request.query) {
      const dateAfter = new Date(request.query.dateAfter);
      if (dateAfter != 'Invalid Date') {
        query = query.where("when", ">", dateAfter)
      }
      else {
        return response.status(404).send(`please provide valid dateAfter Field in the query`)
      }
    }

    if ("dateBefore" in request.query) {
      const dateBefore = new Date(request.query.dateBefore);

      query = query.where("when", "<", dateBefore)

      if (dateBefore && dateBefore != 'Invalid Date') {
        query = query.where("when", "<", dateBefore)

      }
      else {
        return response.status(404).send(`please provide valid dateBefore Field in the query`)
      }
    }
    if ("limit" in request.query) {
      const limit = parseInt(request.query.limit);
      if (!isNaN(limit)) {
        query = query.limit(limit)
      }
      else {
        return response.status(404).send(`please provide valid limit value  in the query`)
      }
    }

    if ("sortKey" in request.query) {
      const orderBy = request.query.sortKey.toString().trim();
      if (orderBy === 'price' || orderBy === 'when' || orderBy === 'max_reservations') {
        if ("sortDir" in request.query) {
          let sortOrder = request.query.sortDir.toString().trim().toUpperCase();
          query = query.orderBy(orderBy, sortOrder)
        }
        else {
          query = query.orderBy(orderBy)
        }
      }
      else {
        return response.send(`Invalid sort key`)
      }
    }
    if (request.query.availableReservations === 'true') {

      query = query
        .select("meal.title", "meal.price", "meal.id",
          knex.raw(
            "meal.max_reservations-ifnull( sum(reservation.number_of_guests),0 )as 'available_slot'"
          )
        )
        .leftJoin("reservation", { "meal.id": "reservation.meal_id" })
        .groupBy(
          "meal.id",
          "meal.title",
          "meal.description",
          "meal.location",
          "meal.when",
          "meal.max_reservations",
          "meal.price",
          "meal.created_date"
        )
        .having("meal.max_reservations", ">", "totalReservations");
    }
    if (request.query.review === 'avg') {
      query = query.select("meal.title", "meal.id", "meal.price", "meal.description", "meal.location",
        knex.raw("count(review.stars) as total_review"), knex.raw("avg(review.stars) as avg_review"))
        .join("review", "meal.id", "=", "review.meal_id")
        .groupBy("review.meal_id")

      query = query.select((knex.raw(` meal.id,meal.title,meal.max_reservations , sum(reservation.number_of_guests)as 'totalReservations'`))).join('reservation', 'reservation.meal_id', '=', 'meal.id').groupBy('meal.id').having('meal.max_reservations', '>', 'totalReservations');

    }

    const data = await query;
    data.length ? response.status(200).json(data) : response.send(`No meal Found`);
  }

  catch (e) {
    response.status(500).send(e.message)
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

router.get("/:meal_id/reservations", async (req, res) => {
  const mealId = parseInt(req.params.meal_id);
  let query = knex('meal');
  if (!isNaN(mealId)) {
    query = query
      .select("meal.title", "meal.price", "meal.id",
        knex.raw(
          "meal.max_reservations-ifnull( sum(reservation.number_of_guests),0 )as 'available_slot'"
        )
      )
      .leftJoin("reservation", { "meal.id": "reservation.meal_id" }).where("meal.id", mealId).groupBy(
        "meal.id",
        "meal.title",
        "meal.description",
        "meal.location",
        "meal.when",
        "meal.max_reservations",
        "meal.price",
        "meal.created_date"
      )
      .having("meal.max_reservations", ">", "totalReservations");
    const data = await query;
    data.length ? res.status(200).json(data) : res.send(`No meal Found`);
  }
  else {
    res.send(`Invalid Meal Id`)
  }

})

// router.get("/:meal_id/reviews", async (req, res) => {
//   try {
//     const meal = await knex("meal")
//       .select("id", "title")
//       .where("id", "=", `${parseInt(req.params.meal_id)}$`);
//     if (meal.length === 0) return res.status(404).send(`mealid doesn't exists`)
//     const review = await knex("review")
//       .select("*")
//       .where("meal_id", "=", `${parseInt(req.params.meal_id)}$`);
//     review.length === 0 ? res.status(404).send(`No review found for this meal id`) : res.status(200).json(review)
//   }
//   catch (e) {
//     res.status(503).send(`${e.message}`)
//   }
// })


// router.post("/", async (request, response) => {
//   try {
//     const new_meal = await knex("meal").insert({
//       title: request.body.title,
//       description: request.body.description,
//       location: request.body.location,
//       when: request.body.when,
//       max_reservations: request.body.max_reservations,
//       price: request.body.price,
//       created_date: request.body.created_date
//     })
//     response.status(201).json({ NewMeal: new_meal })

//   }
//   catch (error) {
//     response.status(503).send('Not able to create new meal')
//   }
// });
// router.put("/:id", async (req, res) => {
//   const mealId = parseInt(req.params.id);
//   try {
//     const updatedMeal = await knex('meal')
//       .where({ id: mealId })
//       .update({
//         description: req.body.description,
//         title: req.body.title,
//         location: req.body.location
//       })
//     updatedMeal ? res.status(200).json({ MealUpdated: mealId }) : res.status(404).send(`ID doesn't exist`)
//   }
//   catch (e) {
//     res.status(503).send(`Something went wrong`)
//   }
// })
// router.delete("/:id", async (request, response) => {
//   try {
//     const mealId = parseInt(request.params.id);
//     const deletedRecord = await knex("meal")
//       .where({ id: mealId })
//       .del();
//     deletedRecord ? response.status(200).json({ DeletedrecordId: deletedRecord }) :
//       response.status(404).json({ message: "Record not found" });
//   }
//   catch (error) {
//     response.status(503).send(`Couldn't Delete`)
//   }
// });

// module.exports = router;
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
router.get("/:meal_id/reviews", async (req, res) => {
  try {
    const meal = await knex("meal")
      .select("id", "title")
      .where("id", "=", `${parseInt(req.params.meal_id)}$`);
    if (meal.length === 0) return res.status(404).send(`mealid doesn't exists`)
    const review = await knex("review")
      .select("*")
      .where("meal_id", "=", `${parseInt(req.params.meal_id)}$`);
    review.length === 0 ? res.status(404).send(`No review found for this meal id`) : res.status(200).json(review)
  }
  catch (e) {
    res.status(503).send(`${e.message}`)
  }
})
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
      .update({
        description: req.body.description,
        title: req.body.title,
        location: req.body.location
      })
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