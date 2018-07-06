import React from 'react';
import Row from './Row';

const mapBoardToRows = board => board.map(
  (row, i) => <Row row={row} key={i} />
);

const GameBoard = props => (
  <div className="board-wrapper">
    <div className="game-board">
      {props.board && mapBoardToRows(props.board)}
    </div>
  </div>
);

export default GameBoard;
