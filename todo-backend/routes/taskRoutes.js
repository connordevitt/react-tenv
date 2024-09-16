const express = require("express");
const Task = require("../models/Task");
const router = express.Router();


// POST route to create a new task
router.post("/tasks", async (req, res) => {
  try {
    const { text, priority } = req.body;

    // Ensure task text is provided
    if (!text) {
      return res.status(400).json({ message: "Task text is required" });
    }

    // Create the task
    const task = new Task({ text, priority: priority || "Medium" });
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
