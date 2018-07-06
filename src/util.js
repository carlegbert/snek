const { EMPTY, SNAKE } = require('./constants');

export const createBoard = boardSize => {
  const board = new Array(boardSize)
    .fill(null)
    .map(() =>
      new Array(boardSize)
        .fill(null)
        .map(() => EMPTY),
      );

  const center = Math.floor(boardSize / 2);
  board[center][center] = SNAKE;

  return board;
}
