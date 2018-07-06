const { DIRECTIONS, EMPTY } = require('./constants');

export const createBoard = boardSize => {
  const board = new Array(boardSize)
    .fill(null)
    .map(() =>
      new Array(boardSize)
        .fill(null)
        .map(() => EMPTY),
      );

  return board;
}

export const movePoint = (point, direction) => {
  switch (direction) {
    case DIRECTIONS.UP:
      return { ...point, y: point.y - 1 };
    case DIRECTIONS.DOWN:
      return { ...point,  y: point.y + 1 };
    case DIRECTIONS.LEFT:
      return { ...point,  x: point.x - 1 };
    case DIRECTIONS.RIGHT:
      return { ...point,  x: point.x + 1 };
    default:
      throw new Error(`movePoint expected a direction but got ${direction}`)
  }
}

export const getRandomDirection = () => {
  const idx = Math.floor(Math.random() * 4);
  return DIRECTIONS[Object.keys(DIRECTIONS)[idx]];

};
