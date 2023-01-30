const express = require("express");
const app = express();
const router = express.Router();
const path = require("path");
const knex = require("../backend/database");
const mealsRouter = require("./api/meals");
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
app.get('/my-route', (req, res) => {
  res.send("Hi friend");
});

if (process.env.API_PATH) {
  app.use(process.env.API_PATH, router);
} else {
  throw "API_PATH is not set. Remember to set it in your .env file"
}
app.get("/future-meals", async (req, res) => {
  const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` > NOW()");
  rows[0].length === 0 ? res.sendStatus(404) : res.send(rows.slice(0, 1))
});
app.get("/past-meals", async (req, res) => {
  const rows = await knex.raw("SELECT * FROM `meal` WHERE `when` <= NOW()");
  rows[0].length === 0 ? res.sendStatus(404) : res.send(rows.slice(0, 1))
});
app.get("/all-meals", async (req, res) => {
  const rows = await knex.raw("SELECT * FROM `meal`  ORDER BY `id`");
  rows[0].length === 0 ? res.sendStatus(404) : res.send(rows.slice(0, 1))
});
app.get("/first-meal", async (req, res) => {
  const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id` LIMIT 1");
  rows[0].length === 0 ? res.sendStatus(404) : res.send(rows.slice(0, 1))
});
app.get("/last-meal", async (req, res) => {
  const rows = await knex.raw("SELECT * FROM `meal` ORDER BY `id` desc");
  rows[0].length === 0 ? res.sendStatus(404) : res.send(rows.slice(0, 1))
});

// for the frontend. Will first be covered in the react class
app.use("*", (req, res) => {
  res.sendFile(path.join(`${buildPath}/index.html`));
});

module.exports = app;
