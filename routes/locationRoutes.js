const express = require("express");
const { State, City } = require("country-state-city");

const router = express.Router();

// GET all states in India
router.get("/states", (req, res) => {
  try {
    const states = State.getStatesOfCountry("IN");
    res.json(states);
  } catch (error) {
    console.error("STATE ERROR:", error);
    res.status(500).json({ message: "Failed to fetch states" });
  }
});

// GET cities of a specific state
router.get("/cities/:stateCode", (req, res) => {
  try {
    const { stateCode } = req.params;
    const cities = City.getCitiesOfState("IN", stateCode);
    res.json(cities);
  } catch (error) {
    console.error("CITY ERROR:", error);
    res.status(500).json({ message: "Failed to fetch cities" });
  }
});

module.exports = router;
