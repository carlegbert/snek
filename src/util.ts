import {
  TILE_TYPES,
  DIRECTIONS,
  TOP_SPEED,
  SPEED_SEED,
  BOARD_SIZE,
} from './constants'
import { BoardState, Direction, Point } from './types'

export const createBoard = (boardSize: number): BoardState =>
  new Array(boardSize)
    .fill(null)
    .map(() => new Array(boardSize).fill(null).map(() => TILE_TYPES.EMPTY))

export const movePoint = (point: Point, direction: Direction): Point => {
  switch (direction) {
    case DIRECTIONS.UP:
      return { ...point, y: point.y - 1 }
    case DIRECTIONS.DOWN:
      return { ...point, y: point.y + 1 }
    case DIRECTIONS.LEFT:
      return { ...point, x: point.x - 1 }
    case DIRECTIONS.RIGHT:
      return { ...point, x: point.x + 1 }
    default:
      throw new Error(`movePoint expected a direction but got ${direction}`)
  }
}

export const getRandomDirection = (): Direction => {
  const idx = Math.floor(Math.random() * 4)
  return Object.keys(DIRECTIONS)[idx]
}

export const directionsAreOpposite = (
  directionOne: Direction,
  directionTwo: Direction,
): boolean =>
  (directionOne === DIRECTIONS.UP && directionTwo === DIRECTIONS.DOWN) ||
  (directionOne === DIRECTIONS.DOWN && directionTwo === DIRECTIONS.UP) ||
  (directionOne === DIRECTIONS.LEFT && directionTwo === DIRECTIONS.RIGHT) ||
  (directionOne === DIRECTIONS.RIGHT && directionTwo === DIRECTIONS.LEFT)

export const getRandomEmptyLocation = (board: string[][]) => {
  const emptySquares = board.reduce(
    (acc, row, y) => [
      ...acc,
      ...row
        .map((occupiedBy, x) => ({ x, y, occupiedBy }))
        .filter((sq) => sq.occupiedBy === TILE_TYPES.EMPTY),
    ],
    [],
  )
  if (emptySquares.length === 0) return null
  const randNum = Math.floor(Math.random() * emptySquares.length)
  return emptySquares[randNum]
}

export const calculateSpeed = (score: number) =>
  Math.max(TOP_SPEED, SPEED_SEED / (score + 1))

export const newSpaceIsValid = (newSnakeHead: Point, board: string[][]) => {
  const { x, y } = newSnakeHead
  if (y === -1 || y === BOARD_SIZE || x === -1 || x === BOARD_SIZE) return false
  const point = board[y][x]
  return point === TILE_TYPES.EMPTY || point === TILE_TYPES.FOOD
}
