import React from 'react';
import './App.css';
import Grid from './components/grid';

function App() {
  return (
    <div className="page">

      <div className="body">
        <div className="header">
          <h2>Dag: 101</h2>
        </div>
        <div className="details">
          <p className="green">Grønn: Ledig</p>
          <p className="red">Rød: Opptatt</p>
        </div>
        <Grid number="1"/>
        <Grid number="2"/>
      </div>
    </div>
  );
}

export default App;
