const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes"); 
const listRoutes = require("./routes/lists");
require("dotenv").config();

const app = express();

// Middleware
app.use(express.json()); // Applies to routes that need to parse JSON
app.use(cors()); // Enable CORS

// Logging incoming requests for better debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// MongoDB connection
mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/todoapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(error => console.error("Failed to connect to MongoDB:", error));

// Routes
app.use("/api", taskRoutes);
app.use("/api", listRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
