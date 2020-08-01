import React, { Component } from 'react';

const initialState = {
  task: {
    description: '',
    favourited: '',
    done: '',
  },
  error: false
}

class AddTask extends Component {
  state = { ...initialState }

  handleChange = (e) => {

    this.setState({
      task: {
        ...this.state.task,
        [e.target.name]: e.target.value
      }
    })
  }

  // sent form data:
  handleSubmit = (e) => {
    e.preventDefault();

    // extracts values from this.state:
    const { description, favourited } = this.state.task;

    //validate all fields aren´t empty:
    if (description === '' || favourited === '') {
      this.setState({
        error: true
      });
      //stop execution
      return;
    }

    // generate object:
    let newTask = { ...this.state.task };

    // add task to App state:
    this.props.createTask(newTask);

    this.setState({
      ...initialState
    })
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        {error ? <div>campo obligatorio</div> : null}
        <form onSubmit={this.handleSubmit}>
          <p><input type="text"
            placeholder="add a task"
            value={this.state.description}
            name="description"
            onChange={this.handleChange}
            value={this.state.task.description}
          /></p>
          <input
            type="submit"
            value="Add Task"
          />
        </form>
      </div>
    )
  }
}
export default AddTask;