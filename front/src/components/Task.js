import React from 'react';
import './Task.css';

// import checkbox from '../img/checkbox.png';
// import checkboxEnabled from '../img/checkbox-enabled.png';

const Task = ({ task }) => {
  // console.log(task)
  return (
    <div>
      <li>Description:{task.description}
      </li>
    </div>
  );
}
export default Task;