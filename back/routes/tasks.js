const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Task = require("../models/Task");

router.get('/tasks', (req, res, next) => {
  Task
    .find()
    .sort({ timestamp: -1})
    .then(allTasks => res.json(allTasks))
    .catch(e => console.log(e))
});

router.put('/task/:taskId', (req, res, next) => {
  Task
    .findByIdAndUpdate(req.params.taskId, req.body)
    .then(x => {
      res.json({ "update": true, _id: req.params.taskId })
    })
});

router.post('/task', (req, res) => {
  Task
    .create({
      description: req.body.description,
      timestamp: new Date()
    })
    .then(createdTask => [
      res.json(createdTask)
    ])
})

module.exports = router;