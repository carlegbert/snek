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
  // TODO: make this have an equal chance of returning any
  // square on the board.
  const nonFullRows = board
    .map((content, idx) => ({ content, idx }))
    .filter(x => x.content.some(y => y === EMPTY));
  if (nonFullRows.length === 0) return null;
  const randY = Math.floor(Math.random() * nonFullRows.length);
  const row = nonFullRows[randY];

  const nonFullSquares = row.content
    .map((content, idx) => ({ content, idx }))
    .filter(x => x.content === EMPTY);
  const randX = Math.floor(Math.random() * nonFullSquares.length);
  const sq = nonFullSquares[randX];

  const y = row.idx;
  const x = sq.idx;
  return { x, y };
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
