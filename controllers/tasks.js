const express = require("express");
const router = express.Router();
const Task = require('../models/task');
const Subtask = require('../models/subtask');

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
router.delete('/tasks/:id', async (req, res) => {
    try {
        res.status(200).json(await Task.findByIdAndDelete(req.params.id));
    } catch (error) {
        res.status(400).json({ message: "something went wrong"});
    }
});
//UPDATE
router.put('/tasks/:id', async (req, res) => {
    try {
      res.status(201).json(
        await Task.findByIdAndUpdate(
          req.params.id,
          req.body,
          {
            new: true,
          }
          // (err, updatedTask) => {
          //   res.redirect(`/tasks/${req.params.id}`);
          // }
        )
      );
    } catch (error) {
      res.status(400).json({ message: 'something went wrong' });
    }
  });

// CREATE /tasks"
// THIS WORKS
router.post('/tasks', async (req, res) => {
    try {
        res.status(201).json(await Task.create(req.body));
        } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});

// CREATE SUBTASK "/tasks/:id/subtasks"
router.post('/tasks/:id/subtasks', async (req, res) => {
    try {
        const createdSubtask = await Subtask.create(req.body);
        await Task.findByIdAndUpdate(req.params.id, { $push: { subtask: createdSubtask } });
        res.status(201).json(createdSubtask);
    } catch (error) {
        res.status(400).json({ message: "something went wrong" });
    }
});


// EDIT ** Does this need to be findByIdAndUpdate??
router.get('/tasks/:id/edit', async (req, res) => {
  try {
    res.status(200).json(await Task.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});

// SHOW "/tasks" ***** Edited to populate Subtasks 
router.get('/tasks/:id', async (req, res) => {
    try {
      res.status(200).json(
        await Task.findById({ _id: req.params.id }).populate('subtask')
        );
        console.log(req.body)
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });

// SUBTASKS ROUTE (show page for Task)




// SHOW SUBTASK

module.exports = router;