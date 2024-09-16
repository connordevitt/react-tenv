const express = require("express");
const Task = require("../models/Task");
const List = require("../models/List"); // <-- Add this line to import the List model
const router = express.Router();

router.post("/tasks", async (req, res) => {
  const { listId, text, priority } = req.body;

  console.log("Incoming task data:", req.body); // Log incoming data to ensure it's correct
  
  if (!listId || !text) {
    return res.status(400).json({ message: "List ID and task text are required" });
  }

  try {
    // Create a new task
    const task = new Task({
      text,
      priority: priority || "Medium",
      completed: false,
    });

    const newTask = await task.save();
    console.log("Task saved to DB:", newTask); // Log the saved task

    // Find the list and add the task to it
    const list = await List.findById(listId);
    if (!list) {
      return res.status(404).json({ message: "List not found" });
    }

    list.tasks.push(newTask._id);
    await list.save();
    console.log("Task added to list:", list); // Log the updated list

    res.status(201).json(newTask);
  } catch (err) {
    console.error("Error in task creation:", err); // Log the error details
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
