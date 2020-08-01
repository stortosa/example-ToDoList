import React, { Component } from 'react';
import Task from './Task';
import './TaskList.css';

const TaskList = ({ tasks }) => {
  console.log(tasks)

  return (
    <ol className="task-list">
      {
        tasks.map(task =>
          <Task
            task={task}
            toggleDone={this.props.toggleDone}
            toggleFavourite={this.props.toggleFavourite}
            key={task._id}
          // {...task}
          />
        )
      }
    </ol>
  )
}

export default TaskList;
