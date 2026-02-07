const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

// ✅ Get All Cars Route
router.get("/getallcars", async (req, res) => {
  try {
    const cars = await Car.find({});
    res.send(cars);
  } catch (error) {
    return res.status(400).json(error);
  }
});

// ✅ Add Sample Cars Route (Temporary)
router.get("/addsample", async (req, res) => {
  try {
    await Car.insertMany([
      {
        name: "Swift Dzire",
        image: "https://via.placeholder.com/300",
        rentPerHour: 200,
        capacity: 5,
        fuelType: "Petrol",
      },
      {
        name: "Hyundai Creta",
        image: "https://via.placeholder.com/300",
        rentPerHour: 400,
        capacity: 5,
        fuelType: "Diesel",
      },
    ]);

    res.send("Sample cars added successfully ✅");
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
