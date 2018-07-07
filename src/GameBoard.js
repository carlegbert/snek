import React from 'react';
import PropTypes from 'prop-types';
import Row from './Row';

const mapBoardToRows = board => board.map((row, i) => <Row row={row} key={i} />);

const GameBoard = ({ board }) => (
  <div className="board-wrapper">
    <div className="game-board">
      {board && mapBoardToRows(board)}
    </div>
  </div>
);

GameBoard.propTypes = {
  board: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string)),
};

GameBoard.defaultProps = {
  board: undefined,
};

export default GameBoard;
