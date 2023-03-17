const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const Subtask = require('../models/subtask');

// INDEX "/home"
// this works- brings back ALL Tasks
router.get('/home', async (req, res) => {
  try {
    res.status(200).json(await Task.find({createdBy: req.user.uid}));
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});


// NEW "/tasks/new"
// frontend routing


// IMPORTANT     
router.get('/tasks/important', async (req, res) => {
  try {
    const tasks = await Task.find({
      important: true,
      createdBy: req.user.uid 
    });

    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'Something went wrong' });
  }
});




// DELETE
router.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, createdBy: req.user.uid });
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    res.status(200).json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});


//UPDATE

router.put('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task.createdBy !== req.user.uid) {
      return res.status(403).json({ message: 'Unauthorized' });
    }
    res
      .status(201)
      .json(
        await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      );
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});


// CREATE "/tasks"
router.post('/tasks', async (req, res) => {
  try {
    req.body.createdBy = req.user.uid;
    res.status(201).json(await Task.create(req.body));
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});

// // CREATE category
// router.post('/', async (req, res) => {
//   try {
//     res.status(201).json(await Task.create(req.body));
//   } catch (error) {
//     res.status(400).json({ message: 'something went wrong' });
//   }
// });


// CREATE task within list "/tasks/:category"
router.post('/tasks/:category', async (req, res) => {
  try {
    const task = await Task.create({ ...req.body, createdBy: req.user.uid, category: req.params.category });
    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});


// CREATE SUBTASK "/tasks/:id/subtasks" .  *
router.post('/tasks/:id/subtasks', async (req, res) => {
  req.body.createdBy = req.user.uid;
  try {
    
    const createdSubtask = await Subtask.create(req.body);
    await Task.findByIdAndUpdate(req.params.id, {
      $push: { subtask: createdSubtask },
    });
    res.status(201).json(createdSubtask);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});

// EDIT TASK
router.get('/tasks/:id/edit', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    // Check if the task was created by the authenticated user
    if (task.createdBy !== req.user.uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    // Return the task details if it was created by the authenticated user
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});


// SHOW LIST  *** this will be all items, sorted by category *
router.get('/tasks/:category', async (req, res) => {
  try {
    const tasks = await Task.find({ createdBy: req.user.uid, category: req.params.category });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});


// SHOW TASK *** this will be a Task with subtasks *
router.get('/tasks/:id/subtasks', async (req, res) => {
  try {
    const task = await Task.findById({ _id: req.params.id });
    if (task.createdBy !== req.user.uid) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const subtasks = await Task.populate(task, 'subtask');
    res.status(200).json(subtasks);
  } catch (error) {
    res.status(400).json({ message: 'something went wrong' });
  }
});

module.exports = router;
