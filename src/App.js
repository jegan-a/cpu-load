import React, { Component } from 'react';
import './App.css';
import ReactSpeedometer from "./component/Speedometer";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Live CPU Load Monitor</h1>
        </header>
        <p className="App-intro">
          <ReactSpeedometer />
        </p>
      </div>
    );
  }
}

export default App;
