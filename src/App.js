import React, { Component } from 'react';
import './styles/app.css';
import RealtimeContainer from "./containers/SystemLoadContainer";

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="app-header">
          <h1 className="app-title">Realtime System Load</h1>
        </header>
        <p className="app-intro">
          <RealtimeContainer />
        </p>
      </div>
    );
  }
}
export default App;
