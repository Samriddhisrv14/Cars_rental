const express = require("express");
const dotenv = require("dotenv");
const path = require("path");

// Load environment variables FIRST
dotenv.config();

// Connect Database
const connectDB = require("./db");
connectDB();

// App init
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api/cars", require("./routes/carsRoute"));
app.use("/api/users", require("./routes/usersRoute"));
app.use("/api/bookings", require("./routes/bookingsRoute"));

// Test Route
app.get("/", (req, res) => {
  res.send("Backend is running successfully 🚀");
});

// Production Setup (React Build)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

// Start Server
app.listen(port, () => {
  console.log(`Node JS Server Started on Port ${port}`);
  console.log("MONGO_URI =", process.env.MONGO_URI);
});
