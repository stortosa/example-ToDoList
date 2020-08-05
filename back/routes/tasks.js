const express = require('express');
const router = express.Router();
const Task = require("../models/Task");
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Task.find()
    .select('description _id')
    .populate('task', 'description')
    .exec()
    .then(docs => {
      const response = {
        count: docs.length,
        tasks: docs.map(doc => {
          return {
            description: doc.description,
            done: doc.done,
            _id: doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:4000/tasks/' + doc._id
            }
          }
        })
      }
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
});

router.post('/', (req, res, next) => {
  const task = new Task({
    _id: new mongoose.Types.ObjectId(),
    description: req.body.description,
    done: req.body.done
  });
  task
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: 'Created task succesfully',
        createdTask: {
          description: result.description,
          done: result.done,
          _id: result._id,
          request: {
            type: 'POST',
            url: 'http://localhost:4000/tasks/' + result._id
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get('/:taskId', (req, res, next) => {
  const id = req.params.taskId;
  Task.findById(id)
    .sort({ timestamp: -1 })
    .select('description _id')
    .populate('task')
    .exec()
    .then(doc => {
      console.log("From database", doc);
      if (doc) {
        res.status(200).json({
          task: doc,
          request: {
            type: 'GET',
            description: 'Get all tasks',
            url: 'http://localhost:4000/tasks'
          }
        });
      } else {
        res.status(404).json({ message: "No valid entry found for proveided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});

router.put('/:taskId', (req, res, next) => {
  const id = req.params.taskId
  Task.findByIdAndUpdate(id, req.body, { new: true })
    .populate('task')
    .then(x => {
      console.log(x)
      res.json({ "updated": true, id })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

// router.get('/tasks', (req, res, next) => {
//   Task
//     .find()
//     .sort({ timestamp: -1})
//     .then(allTasks => res.json(allTasks))
//     .catch(e => console.log(e))
// });

module.exports = router;