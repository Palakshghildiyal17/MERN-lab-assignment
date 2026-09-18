const mongoose = require("mongoose");

// Defaults to a local MongoDB daemon so the project stays portable.
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/notes_db";

const connectDB = () => {
  return mongoose
    .connect(MONGO_URI)
    .then((conn) => {
      console.log(`MongoDB connected: ${conn.connection.host}/${conn.connection.name}`);
    })
    .catch((err) => {
      console.error("MongoDB connection failed:", err.message);
      console.error("Is the mongod daemon running on port 27017?");
      process.exit(1);
    });
};

module.exports = connectDB;
