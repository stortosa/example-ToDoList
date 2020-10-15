const express = require('express');
const router = express.Router();
const Task = require("../models/Task");
const mongoose = require('mongoose');

router.get('/', (req, res, next) => {
  Task.find()
    .select('description _id done createdAt')
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
            createdAt: doc.createdAt,
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
    done: req.body.done,
    timestamps: new Date()
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
          createdAt: result.createdAt,
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

router.delete('/:taskId', (req, res, next) => {
  const id = req.params.taskId;
  Task.deleteMany({ _id: id })
    .exec()
    .then(result => {
      console.log(result)
      res.status(200).json({
        message: 'Task deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:4000/tasks',
          body: { description: 'String' }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

});

module.exports = router;