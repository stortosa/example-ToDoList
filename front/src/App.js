import React, { Component, Fragment } from 'react';
import AddTask from './components/AddTask';

class App extends Component {
  state = {
    allTasks: [],
  };


  componentDidMount() {
    this.setState({
      ...this.state,
    });
  }


  render() {

    return (
      <Fragment>
        <AddTask />
      </Fragment>
    );
  }
}

export default App;