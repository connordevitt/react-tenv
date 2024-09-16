const express = require('express');
const List = require('../models/List'); // Ensure the List model path is correct
const Task = require('../models/Task'); // Ensure the Task model path is correct
const router = express.Router();

// GET all lists
router.get('/lists', async (req, res) => {
  try {
    console.log("Received a GET request for /lists");
    const lists = await List.find().populate('tasks'); // Populate tasks when fetching lists
    console.log("Fetched lists:", JSON.stringify(lists, null, 2)); // Log detailed lists data
    res.json(lists);
  } catch (error) {
    console.error("Error fetching lists:", error);
    res.status(500).json({ message: error.message });
  }
});

// GET a single list by ID
router.get('/lists/:id', async (req, res) => {
  try {
    console.log(`Received a GET request for list with ID: ${req.params.id}`);
    const list = await List.findById(req.params.id).populate('tasks'); // Populate tasks with full task data
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    console.log("Fetched list:", JSON.stringify(list, null, 2)); // Log detailed single list data
    res.json(list);
  } catch (error) {
    console.error(`Error fetching list with ID: ${req.params.id}`, error);
    res.status(500).json({ message: error.message });
  }
});

// POST a new list
router.post('/lists', async (req, res) => {
  const { title } = req.body;

  if (!title) {
    return res.status(400).json({ message: "Title is required" });
  }

  try {
    console.log("Creating a new list with title:", title);
    const list = new List({ title });
    const newList = await list.save();
    console.log("New list created:", JSON.stringify(newList, null, 2)); // Log the newly created list
    res.status(201).json(newList);
  } catch (error) {
    console.error("Error creating new list:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
