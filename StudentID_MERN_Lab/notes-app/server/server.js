const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const noteRoutes = require("./routes/noteRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

// Middleware must be mounted before the route handlers.
app.use(cors()); // Permits cross-origin requests from http://localhost:5173
app.use(express.json());

app.use("/api/notes", noteRoutes);

// Simple health check, handy while smoke-testing in Postman.
app.get("/", (req, res) => {
  res.send("Notes API is running.");
});

app.listen(PORT, () => {
  console.log(`Express server listening on http://localhost:${PORT}`);
});
