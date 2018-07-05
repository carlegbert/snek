import React, { Component } from 'react';
import Row from './Row';

export default class GameBoard extends Component {
  constructor({ boardSize }) {
    super();
    this.boardSize = boardSize;
  }

  renderRows() {
    const rows = [];
    for (let i = 0; i < this.boardSize; i++) {
      rows.push(<Row yCoord={i} key={i} boardSize={this.boardSize} />);
    };
    return rows;
  }

  render() {
    return (
      <div className="board-wrapper">
        <div className="game-board">
          {this.renderRows()}
        </div>
      </div>
    )
  }
}
