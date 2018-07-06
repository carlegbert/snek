import React from 'react';
import Square from './Square';

const mapRowToSquares = row => row.map(
  (x, i) => <Square key={i} occupiedBy={x} />
);

const Row = props => (
  <div className="game-row">
    {mapRowToSquares(props.row)}
  </div>
);

export default Row;
