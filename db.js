const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Mongo DB Connection Successful ✅");
  } catch (error) {
    console.log("Mongo DB Connection Error ❌");
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
