import React, { Component } from 'react';
import axios from 'axios';

import TaskList from './TaskList';
import "./TaskCollection.css";
import TaskElement from './TaskElement';

export default class TaskCollection extends Component {
  constructor() {
    super()
  }
    state = {
      task: {
        description: "",
        favourited: false,
        done: false,
        newTaskString: "",
        tasks: []
      }
    }

  handleSubmit(event) {  // add tasks
    event.preventDefault();

    const { description, favourited, done } = this.state.task;

    console.log(this.state);

    axios.post('http://localhost:4000/tasks', {
      description, favourited, done
    })
      .then(createdTask => {
        let tasksClonedArray = []

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

  componentDidMount() {
    axios
      .get('http://localhost:4000/tasks')
      .then(allTasks => {
        // console.log(allTasks.data.tasks)
        allTasks = allTasks.data.tasks.map(task => {
          // console.log(task)
          return new TaskElement(
            task._id, task.description, task.timestamp, task.favourited, task.done
          )
        })
        this.setState({
          ...this.state,
          tasks: allTasks,
        })
      })
  }

  handleInputChange(event) {
    event.preventDefault(); // puede que borrar

    // console.log(event.target.value)
    const { name, value } = event.target;
    this.setState({
      ...this.state,
      // tasks: allTasks,
      [name]: value
      // newTaskString: event.target.value
    })
  }

  toggle(taskID, property) {
    let chosenTask = this.state.tasks.filter(task => task._id === taskID)[0]

    chosenTask[property] = !chosenTask[property]

    axios
      .put(`http://localhost:4000/tasks/${taskID}`, {
        done: chosenTask.done,
        favourited: chosenTask.favourited
      })
      .then(updatedTaskInfo => {
        console.log(updatedTaskInfo)

        this.setState({
          ...this.state
        })
      })
  }

  render() {
    const { newTaskString } = this.state
    return (
      <div>
        <p>la tarea es: {newTaskString}</p>
        <form onSubmit={this.handleSubmit}>
          <p><input type="text"
            placeholder="add a task"
            value={this.state.description}
            name="newTaskString"
            onChange={event => this.handleInputChange(event)}

          /></p>
          {/* <p><button onKeyDown={event => this.handleSubmit(event)}>Send Task</button></p> */}
          <TaskList tasks={this.state.tasks}
            toggleDone={(tasks) => this.toggle(tasks, "done")}
            toggleFavourite={(tasks) => this.toggle(tasks, "favourite")}
          ></TaskList>
          <input type="submit" value="Send Task" />
        </form>

      </div>
    )
  }
}
