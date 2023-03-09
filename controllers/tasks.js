const express = require("express");
const router = express.Router();
const Task = require('../models/task');

// INDEX "/home" 
// this works- brings back ALL Tasks 
router.get('/home', async (req, res) => {
    try {
        res.status(200).json(await Task.find({}));
    } catch (error) {
        res.status(400).json({ message: 'something went wrong' });
    }
});

// NEW "/tasks/new"

// DELETE

// UPDATE 

// CREATE /tasks"
// THIS WORKS
router.post('/tasks', async (req, res) => {
    try {
        res.status(201).json(await Task.create(req.body));
        } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});

// EDIT no route? edits on same page?

// SHOW "/tasks"



module.exports = router;