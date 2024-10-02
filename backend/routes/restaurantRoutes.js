const express = require("express");
const {
  restaurantId,
  restaurantsNear,
  restaurants,
  search,
} = require("../controller/restaurantRoutes");

const router = express.Router();

router.get("/restaurant/:id", restaurantId);
router.get("/restaurants", restaurants);
router.get("/restaurants/near", restaurantsNear);
router.get("/search", search);

module.exports = router;
