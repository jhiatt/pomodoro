import React from 'react';
import './App.css';
import './materialize.css';
import TaskList from './components/tasklist';
import Timer from './components/timer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      timerStart: 0
    }
    this.timerCallback = this.timerCallback.bind(this);

  };



  timerCallback = (time) => {
    this.setState({timerStart: time });
    console.log(Date(this.state.timerStart))
  };

  render() {
    
    return (
    <div className="App">
      <header className="App-header">
        <Timer startTime={this.state.timerStart} />
        <TaskList timerCall={this.timerCallback}/>
      </header>
    </div>
    );
  }
}

export default App;
