import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import { BOARD_SIZE, KEYS } from './constants';

import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardSize: BOARD_SIZE,
      started: false,
      score: 0,
    }
  }

  handleKeyDown(e) {
    switch (e.which) {
      case KEYS.SPACE:
        e.preventDefault();
        this.startGame();
        break;
      default:
        break;
    }
  }

  startGame() {
    this.setState({ started: true });
  }

  render() {
    return (
      <div
        className="app"
        onKeyDown={this.handleKeyDown.bind(this)}
        tabIndex="0"
      >
        <GameHeader
          started={this.state.started}
          score={this.state.score}
        />
        <GameBoard boardSize={BOARD_SIZE} />
      </div>
    );
  }
}

export default App;
