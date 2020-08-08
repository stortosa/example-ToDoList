import React, { Component, Fragment } from 'react';
import Task from './Task';
import axios from 'axios';


class AddTask extends Component {
  state = {
    description: '',
    error: false,
    allTasks: [],          // newAdd
    count: null
  };

  increment = () => {
    this.setState({
      count: this.state.allTasks.length + 1
    })
  }

  decrement = () => {
    this.setState({
      count: this.state.allTasks.length - 1
    })
  }

  initialCount = () => {

  }

  getAllTasks = () => {                       // newAdd
    axios
      .get('http://localhost:4000/tasks')
      .then(response => {
        // console.log(response.data.tasks)
        this.setState({
          ...this.state,
          allTasks: response.data.tasks
        })
      })
  }


  componentDidMount() {
    this.setState({
      ...this.state,
    })
    this.getAllTasks();
    this.count = this.state.allTasks.length;
  };

  // sent form data:
  handleSubmit = (e) => {
    e.preventDefault();

    // extracts values from this.state:
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

    axios.post('http://localhost:4000/tasks', {  //done
      description                                //description
    })
      .then(createdTask => {

        let cloneAllTasks = [...this.state.allTasks];

        // console.log(createdTask.data.createdTask);
        // cloneAllTasks.push(createdTask)              // newAdd Duplica el result

        this.setState({
          ...this.state,
          allTasks: cloneAllTasks,
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

  // next steps:
  // toggleForm = () => {
  //   if (!this.state.isShowing) {
  //     this.setState({ isShowing: true });
  //   } else {
  //     this.setState({ isShowing: false });
  //   }
  // }

  toggle(task_id) {
    let chosenTask = this.state.allTasks.filter(task => task._id === task_id)[0];
    chosenTask.done = !chosenTask.done

    // if (!chosenTask.done) {
    //   this.setState({ done: true });
    // } else {
    //   this.setState({ done: false })
    // }
    axios
      .put(`http://localhost:4000/tasks/${task_id}`, {
        done: chosenTask.done,
      })
      .then(updatedTaskInfo => {
        console.log(updatedTaskInfo)

        this.setState({
          ...this.state
        })
      })
  }

  deleteTask = (task_id) => {
    console.log("Eliminando........", task_id)
    axios.delete(`http://localhost:4000/tasks/${task_id}`)
      .then(res => {
        console.log(res);
        this.setState({
          ...this.state,
        });
      });
    this.getAllTasks();
    this.decrement();
  }


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