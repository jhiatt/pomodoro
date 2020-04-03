import React from 'react';
import './App.css';
import './materialize.css';
// import '../node_modules/materialize-css/sass/materialize.scss';
import Task from './components/task';
// import 'materialize-css';
// import { Button, Card, Row, Col } from 'react-materialize';

function App() {
  return (
    <div className="App">
      <header className="App-header">

        <Task />
      </header>
    </div>
  );
}

export default App;
