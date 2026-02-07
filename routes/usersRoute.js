const express = require("express");
const router = express.Router();
const User = require("../models/userModel");

// ✅ REGISTER ROUTE
router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "Username already exists ❌",
      });
    }

    // Create new user
    const newUser = new User({ username, password });
    await newUser.save();

    res.json({
      message: "User registered successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed ❌",
      error,
    });
  }
});

// ✅ LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "User not found ❌",
      });
    }

    // Check password
    if (user.password !== password) {
      return res.status(400).json({
        message: "Wrong password ❌",
      });
    }

    // Login successful
    res.json({
      message: "Login successful ✅",
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error ❌",
      error,
    });
  }
});

module.exports = router;
