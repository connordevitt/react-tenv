// routes/lists.js or listRoutes.js
const express = require('express');
const List = require('../models/List'); // Make sure the model path is correct
const Task = require('../models/Task'); // Ensure this path is correct
const router = express.Router();

// GET all lists
// GET a single list by ID
router.get('/lists/:id', async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('tasks'); // Ensure tasks are populated
    if (!list) {
      return res.status(404).json({ message: 'List not found' });
    }
    res.json(list);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// POST a new list
router.post('/lists', async (req, res) => {
  const list = new List({
    title: req.body.title,
  });
  try {
    const newList = await list.save();
    res.status(201).json(newList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
