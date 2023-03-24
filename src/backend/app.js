// const express = require("express");
// const app = express();
// const router = express.Router();
// const path = require("path");

// const mealsRouter = require("./api/meals");
// const buildPath = path.join(__dirname, "../../dist");
// const port = process.env.PORT || 3000;
// const cors = require("cors");

// // For week4 no need to look into this!
// // Serve the built client html
// app.use(express.static(buildPath));

// // Parse URL-encoded bodies (as sent by HTML forms)
// app.use(express.urlencoded({ extended: true }));
// // Parse JSON bodies (as sent by API clients)
// app.use(express.json());

// app.use(cors());

// router.use("/meals", mealsRouter);

// if (process.env.API_PATH) {
//   app.use(process.env.API_PATH, router);
// } else {
//   throw "API_PATH is not set. Remember to set it in your .env file"
// }

// // for the frontend. Will first be covered in the react class
// app.use("*", (req, res) => {
//   res.sendFile(path.join(`${buildPath}/index.html`));
// });

// module.exports = app;
const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("../backend/database");
const mealsRouter = require("./api/meals");
const reservRouter = require("./api/reservations");
const reviewRouter = require("./api/reviews")
const buildPath = path.join(__dirname, "../../dist");
const port = process.env.PORT || 3000;
const cors = require("cors");

// For week4 no need to look into this!
// Serve the built client html
app.use(express.static(buildPath));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors());

router.use("/meals", mealsRouter);
router.use("/reserve", reservRouter);
router.use("/reviews", reviewRouter)
app.get('/my-route', (req, res) => {
  res.send("Hi friend");
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}
app.get("/future-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` >= NOW()");
    rows[0].length === 0 ? res.status(200).send(`no meals found in future dates`) : res.send(rows.slice(0, 1))
  }
  catch (e) {
    res.statusCode = 500;
    res.send(e.message);
  }
});
app.get("/past-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` < NOW()");
    rows[0].length === 0 ? res.status(200).send(`No meals found in past time`) : res.send(rows.slice(0, 1))
  }
  catch (e) {
    res.statusCode = 500;
    res.send(e.message);
  }
});
app.get("/all-meals", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal`  ORDER BY `id`");
    rows[0].length === 0 ? res.status(200).send(`No meals found`) : res.send(rows.slice(0, 1))
  }
  catch (e) {
    res.statusCode = 500;
    res.send(e.message);
  }
});
app.get("/first-meal", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id` LIMIT 1");
    rows[0].length === 0 ? res.status(200).send(`No meals found`) : res.send(rows.slice(0, 1))
  }
  catch (e) {
    res.statusCode = 500;
    res.send(e.message);
  }
});
app.get("/last-meal", async (req, res) => {
  try {
    const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id` desc");
    rows[0].length === 0 ? res.status(200).send(`No meals found`) : res.send(rows.slice(0, 1))
  }
  catch (e) {
    res.statusCode = 500;
    res.send(e.message);
  }
});

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
