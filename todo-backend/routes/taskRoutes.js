const express = require("express");
const Task = require("../models/Task"); // Ensure Task model is defined
const router = express.Router();

// GET all tasks
router.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new task
router.post("/tasks", async (req, res) => {
  const task = new Task({
    text: req.body.text,
    priority: req.body.priority,
    completed: false
  });

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
