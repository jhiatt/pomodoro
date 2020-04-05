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
      timerOn: false,
      completedId: ''
    }
    this.timerCallback = this.timerCallback.bind(this);
    this.completeCallback = this.completeCallback.bind(this);
  };



  timerCallback = (t) => {
    this.setState({eventId: t.id });
    this.setState({description: t.description});
    this.setState({timerOn: true});
  };

  completeCallback = (t) => {
    this.setState({completedId: t});
  }

  render() {
    
    return (
    <div className="App">
      <header className="App-header">
        <Timer eventId={this.state.eventId} description={this.state.description} timerOn={this.state.timerOn} compCall={this.completeCallback} />
        <TaskList timerCall={this.timerCallback} compId={this.state.completedId} />
      </header>
    </div>
    );
  }
}

export default App;
