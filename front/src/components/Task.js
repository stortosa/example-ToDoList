import React, { Component } from 'react';
import './Task.css';

import checkbox from '../img/checkbox.png';
import checkboxEnabled from '../img/checkbox-enabled.png';

class Task extends Component {
  state = {
    allTasks: [],
    times: this.props.task.createdAt,
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      times : new Date(this.state.times).toLocaleString("en-GB")
    })
  };
 // this.state.times = new Date(this.state.times).toLocaleString("en-GB")
  render() {

    return (
      <section className="">
        <div className="list-group-item d-flex justify-content-center align-items-center">
          <li className="task">{this.props.task.description}
            {
              this.props.task.done
                ?
                <img src={checkboxEnabled} className="done" alt="" onClick={() => this.props.toggleDone(this.props.task._id)}></img>
                :
                <img src={checkbox} className="done" alt="" onClick={() => this.props.toggleDone(this.props.task._id)}></img>
            }
            <span className="date">date: {this.state.times}</span>
            <div>
              <button
                type="button"
                className="btn btn-danger"
                onClick={this.props.onDelete}
              >Delete&times;</button>
            </div>
          </li>
        </div >
      </section>
    );
  }
}

export default Task;