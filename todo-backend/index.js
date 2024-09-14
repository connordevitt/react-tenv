const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const listRoutes = require("./routes/lists");  // Adjust path if needed
const taskRoutes = require("./routes/taskRoutes");  // Ensure this path is correct
require("dotenv").config();  // Load environment variables

const app = express();

// Middleware
app.use(express.json());  // To parse JSON bodies
app.use(cors());  // To enable CORS for cross-origin requests

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoapp", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("Failed to connect to MongoDB:", error));

// Use the list routes and task routes
app.use("/api", listRoutes);  // Route for lists
app.use("/api", taskRoutes);  // Route for tasks

// Default error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
