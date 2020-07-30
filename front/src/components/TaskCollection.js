import React, { Component } from 'react';
import axios from 'axios';

import TaskList from './TaskList';
import "./TaskCollection.css";
import TaskElement from './TaskElement';

export default class TaskCollection extends Component {
  constructor() {
    super();

    this.state = {
      newTaskString: "",
      tasks: []
    }
  }

  componentDidMount() {
    axios
      .get('http://localhost:4000/tasks')
      .then(allTasks => {
        allTasks = allTasks.data.map(task => {
          return new TaskElement(
            task._id, task.description, task.timestamp, taks.favourited, task.done
          )
        })
        this.setState({
          ...this.state,
          tasks: allTasks
        })
      })
  }

  toggle(taskID, property) {
    let chosenTask = this.state.tasks.filter(task => task._id === taskID)[0]

    chosenTask[property] = !chosenTask[property]

    axios
      .put(`http://localhost:4000/task/${taskID}`, {
        done: chosenTask.done,
        favourited: chosenTask.favourited
      })
      .then(updatedTaskInfo => {
        console.log(updatedTaskInfo),

          this.setState({
            ...this.state
          })
      })
  }

  updateNewTaskString(e) {
    this.setState({
      ...this.state,
      newTaskString: e.target.value
    })
  }

  addNewTask(e) {
    if (e.key === 'Enter') {
      axios.post('http://localhost:4000/task', {
        "description": this.state.newTaskString
      })
        .then(createdTask => {
          let tasksClonedArray = [...this.state.tasks]

          createdTask = createdTask.data
          tasksClonedArray.unshift(
            new TaskElement(createdTask._id, createdTask.description, createdTask.timestamp, createdTask.favourited, createdTask.done)
          )
          this.setState({
            ...this.state,
            tasks: tasksClonedArray,
            newTaskString: ""
          })
        })
    }
  }

  render() {
    return (
      <section>
        <input type="text"
          placeholder="add a new task"
          className="add-new-task"
          value={this.state.newTaskString}
          onChange={this.updateNewTaskString(e)}
          onKeyDown={this.addNewTask(e)}
        />
        <TaskList tasks={this.state.tasks}
          toggleDone={(tasks) => this.toggle(task, "done")}
          toggleFavourite={(tasks) => this.toggle(task, "favourite")}
        ></TaskList>
      </section>
    )
  }
}
