import React, { Component, Fragment } from 'react';
// import TaskCollection from './components/TaskCollection';
import AddTask from './components/AddTask';
import TaskList from './components/TaskList';

class App extends Component {
  state = {
    tasks: []
  }

  createTask(data) {
    // console.log(data);
    let tasks = [...this.state.tasks, data]
    this.setState({
      ...this.state,
      tasks: tasks
    })
  }

  render() {

    return (
      <Fragment>
        {/* <TaskCollection /> */}
        <AddTask
        createTask={this.createTask}
        />
        < TaskList tasks={this.state.tasks}/>
      </Fragment>
    );
  }
}

export default App;