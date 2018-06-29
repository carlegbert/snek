import React, { Component } from 'react';

export default class Row extends Component {
  constructor({ xCoord, boardSize }) {
    super();
    this.xCoord = xCoord;
    this.boardSize = boardSize;
  }

  render() {
    return (
      <div className="game-square">
      </div>
    )
  }
}
