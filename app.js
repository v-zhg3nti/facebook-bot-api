require("dotenv").config();

const express = require("express");
const app = express();

//npm modules
const bodyParser = require("body-parser");

//server modules
const {
  server: { port },
} = require("./src/config/index");

const webHookRouter = require("./src/controllers/facebook-web-hooks");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", webHookRouter);

app.listen(port, () => console.log(`App is up and working on port ${port}`));
