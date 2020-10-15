import React, { Component, Fragment } from 'react';
import Task from './Task';
import Error from './Error';
import axios from 'axios';


class AddTask extends Component {
  state = {
    description: '',
    done: false,
    error: false,
    allTasks: [],
    allTimes: [],

  };

  getAllTasks = () => {
    axios
      .get('http://localhost:4000/tasks')
      .then(response => {
        console.log(response.data.tasks)
        this.setState({
          ...this.state,
          allTasks: response.data.tasks,
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
          description: '',
          error: false
        });
      })
      .catch(error => console.log(error))

    this.getAllTasks();
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
          console.log(chosenTask.done);
        };


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
  }

  componentDidMount() {
    this.setState({
      ...this.state,
    })
    this.getAllTasks();
  };


  render() {

    const { error } = this.state;
    const { allTasks } = this.state;

    return (
      <Fragment>
        <div className="col-md-8 mx-auto">
          {error ? <Error message="All fields are mandatory" /> : null}

          <form className="mt-5" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                placeholder="add a task"
                className="form-control"
                value={this.state.description}
                name="description"
                onChange={this.handleChange}
              />
            </div>
            <input
              type="submit"
              className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-lg py-3"
              value="Add Task"
              onClick={this.handleSubmit}
            />
          </form>
        </div>
        <h3 className="text-center">Tasks to do: {allTasks.length}</h3>
        <h3 className="text-center">Remaining Tasks: {this.state.allTasks.filter(task => !task.done).length}</h3>
        <ul className="list-group mt-5">
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