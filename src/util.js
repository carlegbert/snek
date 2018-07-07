const {
  BOARD_SIZE,
  DIRECTIONS,
  EMPTY,
  FOOD,
  SPEED_SEED,
  TOP_SPEED,
} = require('./constants');

export const createBoard = (boardSize) => {
  const board = new Array(boardSize)
    .fill(null)
    .map(() => new Array(boardSize)
      .fill(null)
      .map(() => EMPTY));

  return board;
};

export const movePoint = (point, direction) => {
  switch (direction) {
    case DIRECTIONS.UP:
      return { ...point, y: point.y - 1 };
    case DIRECTIONS.DOWN:
      return { ...point, y: point.y + 1 };
    case DIRECTIONS.LEFT:
      return { ...point, x: point.x - 1 };
    case DIRECTIONS.RIGHT:
      return { ...point, x: point.x + 1 };
    default:
      throw new Error(`movePoint expected a direction but got ${direction}`);
  }
};

export const getRandomDirection = () => {
  const idx = Math.floor(Math.random() * 4);
  return DIRECTIONS[Object.keys(DIRECTIONS)[idx]];
};

export const directionsAreOpposite = (directionOne, directionTwo) => (
  (directionOne === DIRECTIONS.UP && directionTwo === DIRECTIONS.DOWN)
    || (directionOne === DIRECTIONS.DOWN && directionTwo === DIRECTIONS.UP)
    || (directionOne === DIRECTIONS.LEFT && directionTwo === DIRECTIONS.RIGHT)
    || (directionOne === DIRECTIONS.RIGHT && directionTwo === DIRECTIONS.LEFT));

export const getRandomEmptyLocation = (board) => {
  const emptySquares = board
    .reduce((acc, row, y) => [
      ...acc,
      ...row.filter(sq => sq === EMPTY)
        .map((_, x) => ({ x, y })),
    ], []);
  if (emptySquares.length === 0) return null;
  const randNum = Math.floor(Math.random() * emptySquares.length);
  return emptySquares[randNum];
};

export const calculateSpeed = score => Math.max(
  TOP_SPEED,
  SPEED_SEED / (score + 1),
);

export const newSpaceIsValid = (newSnakeHead, board) => {
  const { x, y } = newSnakeHead;
  if (y === -1 || y === BOARD_SIZE || x === -1 || x === BOARD_SIZE) return false;
  const point = board[y][x];
  return (point === EMPTY || point === FOOD);
};
