import React from 'react';
import './App.css';
import './materialize.css';
import TaskList from './components/tasklist';
import Timer from './components/timer';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventId: '',
      description: '',
      // timerOn: false,
      completedId: '',
      startTime: 0
    }
    this.timerCallback = this.timerCallback.bind(this);
    this.completeCallback = this.completeCallback.bind(this);
  };



  timerCallback = (t) => {
    this.setState({eventId: t.id });
    this.setState({description: t.description});
    // this.setState({timerOn: true});
    this.setState({startTime: t.time});
  };

  completeCallback = (t) => {
    console.log("1: " + t)
    this.setState({completedId: t});
  }

  render() {
    
    return (
    <div className="App">
      <header className="App-header">
        <Timer eventId={this.state.eventId} description={this.state.description} startTime={this.state.startTime} compCall={this.completeCallback} />
        <TaskList timerCall={this.timerCallback} compId={this.state.completedId} />
      </header>
    </div>
    );
  }
}

export default App;
