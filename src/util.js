const {
  DIRECTIONS,
  EMPTY,
  SPEED_DENOM,
  SPEED_SEED,
  TOP_SPEED,
} = require('./constants');

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

export const directionsAreOpposite = (directionOne, directionTwo) => {
  return ((directionOne === DIRECTIONS.UP && directionTwo === DIRECTIONS.DOWN)
    || (directionOne === DIRECTIONS.DOWN && directionTwo === DIRECTIONS.UP)
    || (directionOne === DIRECTIONS.LEFT && directionTwo === DIRECTIONS.RIGHT)
    || (directionOne === DIRECTIONS.RIGHT && directionTwo === DIRECTIONS.LEFT));
};

export const getRandomEmptyLocation = board => {
  const nonFullRows = board
    .map((content, idx) => ({ content, idx }))
    .filter(x => x.content.some(y => y === EMPTY));
  // TODO: If all rows are full, you win; return null to signify?
  const randY = Math.floor(Math.random() * nonFullRows.length);
  const row = nonFullRows[randY];

  const nonFullSquares = row.content
    .map((content, idx) => ({ content, idx }))
    .filter(x => x.content === EMPTY);
  const randX = Math.floor(Math.random() * nonFullSquares.length);
  const sq = nonFullSquares[randX];

  const x = row.idx;
  const y = sq.idx;
  return { x, y };
}

export const calculateSpeed = score =>
  Math.max(
    TOP_SPEED,
    SPEED_SEED / (score * SPEED_DENOM + 1),
  );
