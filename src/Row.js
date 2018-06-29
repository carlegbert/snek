import React, { Component } from 'react';
import Square from './Square';

export default class Row extends Component {
  constructor({ yCoord, boardSize }) {
    super();
    this.yCoord = yCoord;
    this.boardSize = boardSize;
  }

  renderSquares() {
    const squares = [];
    for (let i = 0; i < this.boardSize; i++) {
      squares.push(<Square xCoord={i} key={i} />);
    };
    return squares;
  }

  render() {
    return (
      <div className="game-row">
        {this.renderSquares()}
      </div>
    )
  }
}
