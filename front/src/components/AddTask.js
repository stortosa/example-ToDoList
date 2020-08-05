import React, { Component, Fragment } from 'react';
import Task from './Task';
import axios from 'axios';


class AddTask extends Component {
  state = {
    description: '',
    error: false,
    allTasks: []          // newAdd
  };

  // sent form data:
  handleSubmit = (e) => {
    e.preventDefault();

    // extracts values from this.state:
    const description = this.state.description;

    //validate all fields aren´t empty:
    if (description === '') {
      this.setState({
        error: true
      });
      //stop execution
      return;
    }

    axios.post('http://localhost:4000/tasks', {  //done
      description: description
    })
      .then(createdTask => {

        let cloneAllTasks = [...this.state.allTasks];     //newAdd

        // console.log(createdTask.data.createdTask);
        cloneAllTasks.push(createdTask)              // newAdd

        this.setState({
          ...this.state,
          allTasks: cloneAllTasks,                    // newAdd
          description: '',
        });
      })
      .catch(error => console.log(error))

    this.getAllTasks();
  };

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

  // next steps:
  // deleteGoal = (e, goal_id) => {
  //   e.preventDefault();
  //   this.service.removeGoal(goal_id)
  //     .then(x => {
  //       // this.setState({
  //       //   ...this.state,
  //       // })
  //     })
  //   this.getUserGoals()
  // }


  render() {

    const { error } = this.state;
    const { allTasks } = this.state;

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
              onClick={this.handleSubmit}
            />
          </form>
        </div>
        <ul>
          {allTasks.map((task) => (
            <Task
              key={task._id}
              task={task}
            />
          ))}
        </ul>
      </Fragment>
    )
  }
}
export default AddTask;