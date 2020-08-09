import React, { Component, Fragment } from 'react';
import Task from './Task';
import axios from 'axios';


class AddTask extends Component {
  state = {
    description: '',
    done: false,
    error: false,
    allTasks: [],
    count: null
  };

  increment = () => {
    this.setState({
      count: this.state.allTasks.length + 1
    })
  };

  decrement = () => {
    this.setState({
      count: this.state.allTasks.length - 1
    })
  };

  getAllTasks = () => {
    axios
      .get('http://localhost:4000/tasks')
      .then(response => {
        console.log(response.data.tasks)
        this.setState({
          ...this.state,
          allTasks: response.data.tasks
        })
      })
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const description = this.state.description;

    //validate all fields aren´t empty:
    if (description === '') {
      this.setState({
        error: true,
        count: this.state.allTasks.length
      });
      //stop execution
      return;
    }

    axios.post('http://localhost:4000/tasks', {
      description
    })
      .then(createdTask => {

        let cloneAllTasks = [...this.state.allTasks];

        this.setState({
          ...this.state,
          allTasks: cloneAllTasks,
        });
      })
      .catch(error => console.log(error))

    this.getAllTasks();
    this.increment();
  };


  handleChange = (e) => {
    this.setState({
      ...this.state.description,
      [e.target.name]: e.target.value,
    });
  };


  toggle(task_id) {
    let chosenTask = this.state.allTasks.filter(task => task._id === task_id)[0];

    chosenTask.done = !chosenTask.done
    console.log(chosenTask.done)

    axios
      .put(`http://localhost:4000/tasks/${task_id}`, {
        done: chosenTask.done,
      })
      .then(updatedTaskInfo => {
        // console.log(updatedTaskInfo)

        if (!chosenTask.done) {
          this.setState({
            done: true,
            ...this.state,
          });
          console.log(chosenTask.done)

        } else {
          this.setState({
            done: false,
            ...this.state,
          })
          console.log(chosenTask.done)
        }

        this.setState({
          ...this.state,
        })
      })
  }

  deleteTask = (task_id) => {
    // console.log("Deleting........", task_id)
    axios.delete(`http://localhost:4000/tasks/${task_id}`)
      .then(res => {
        console.log(res);
        console.log(this.state.done)
        this.setState({
          ...this.state,
          done: this.state.done
        });
      });
    this.getAllTasks();
    this.decrement();
    console.log(this.count)

  }

  componentDidMount() {
    this.setState({
      ...this.state,
    })
    this.getAllTasks();
    this.count = this.state.allTasks.length;
  };


  render() {

    const { error } = this.state;
    const { allTasks } = this.state;
    const { count } = this.state;

    return (
      <Fragment>
        <div>
          {error ? <div>campo obligatorio</div> : null}
          <form onSubmit={this.handleSubmit}>
            <p>
              <input
                type="text"
                placeholder="add a task"
                value={this.state.description}
                name="description"
                onChange={this.handleChange}
              />
            </p>
            <input
              type="submit"
              value="Add Task"
              onClick={this.handleSubmit && this.increment}
            />
          </form>
        </div>
        <h3>Task to do: {count}</h3>
        <ul>
          {allTasks.map((task, idx) => (
            <Task
              key={idx}
              onDelete={() => this.deleteTask(task._id)}
              task={task}
              toggleDone={(task) => this.toggle(task, "done")}
            />
          ))}
        </ul>
      </Fragment>
    )
  }
}
export default AddTask;