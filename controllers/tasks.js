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

// EDIT no route? edits on same page?
router.get('/tasks/:id/edit', async (req, res) => {
  try {
    res.status(200).json(await Task.findById(req.params.id));
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});

// SHOW "/tasks"
router.get('/tasks/:id', async (req, res) => {
    try {
      res.status(200).json(
        await Task.findById(req.params.id)
        );
        console.log(req.body)
    } catch (error) {
      res.status(400).json({ message: "something went wrong" });
    }
  });



module.exports = router;