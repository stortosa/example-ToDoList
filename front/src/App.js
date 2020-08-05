import React, { Component, Fragment } from 'react';
import AddTask from './components/AddTask';
import axios from 'axios';

class App extends Component {
  state = {
    count: 0,
    allTasks: [],
    error: false
  };

  increment = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  decrement = () => {
    this.setState({
      count: this.state.count - 1
    })
  }

  handleChange = (e) => {

    this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value
      }
    })
  }

  componentDidMount() {
    this.setState({
      ...this.state,
    });
  }

  toggle(taskID, property) {
    let chosenTask = this.state.tasks.filter(task => task._id === taskID)[0]

    chosenTask[property] = !chosenTask[property]

    axios
      .put(`http://localhost:4000/tasks/${taskID}`, {
        done: chosenTask.done,
      })
      .then(updatedTaskInfo => {
        console.log(updatedTaskInfo)

        this.setState({
          ...this.state
        })
      })
  }

  render() {
    return (
      <Fragment>
        <AddTask />
      </Fragment>
    );
  }
}

export default App;