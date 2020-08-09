import React, { Component } from 'react';
import './Task.css';

import checkbox from '../img/checkbox.png';
import checkboxEnabled from '../img/checkbox-enabled.png';

class Task extends Component {
  state = {
    allTasks: [],
  };

  componentDidMount() {
    this.setState({
      ...this.state,
    })
  };

  render() {
    // console.log(this.props.task.done) 
    return (
      <div className="list-group-item d-flex justify-content-center align-items-center table-dark">
        <li className="task">{this.props.task.description}
          {
            this.props.task.done
              ?
              <img src={checkboxEnabled} className="done" alt="" onClick={() => this.props.toggleDone(this.props.task._id)}></img>
              :
              <img src={checkbox} className="done" alt="" onClick={() => this.props.toggleDone(this.props.task._id)}></img>
          }
          <div>
            <button
              type="button"
              className="btn btn-danger"
              onClick={this.props.onDelete}
            >Delete&times;</button>
          </div>
        </li>
      </div >
    );
  }
}

export default Task;