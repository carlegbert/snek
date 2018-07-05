import React, { Component } from 'react';
import GameBoard from './GameBoard';
import { BOARD_SIZE } from './constants';
import './index.css';

class App extends Component {
  render() {
    return (
      <div className="app">
        <header className="header">
          <h1 className="title">
            <span role="img" aria-label="snake">
              🐍
            </span>
          </h1>
        </header>
        <GameBoard boardSize={BOARD_SIZE} />
      </div>
    );
  }
}

export default App;
