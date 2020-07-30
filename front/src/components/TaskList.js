import React, { Component } from 'react';
import Task from './Task';
import './TaskList.css';

export default class TaskList extends Component {
  render() {
    return (
      <ol className="task-list">
        {
          this.props.tasks.map(task =>
            <Task
              toggleDone={this.props.toggleDone}
              toggleFavourite={this.props.toggleFavourite}
              key={task._id}
              {...task}
            />
          )
        }
      </ol>
    )
  }
}
