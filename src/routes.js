const express = require("express");
const routes = express.Router();
const DayController = require("./controlers/DayController");
const WeekController = require("./controlers/WeekController");

routes.get("/day", DayController.index);
routes.post("/day", DayController.create);
routes.delete("/day", DayController.delete);

routes.post("/week", WeekController.create);
routes.get("/week", WeekController.index);
routes.delete("/week", WeekController.delete);
routes.get("/", WeekController.getAtualDay);

module.exports = routes;
