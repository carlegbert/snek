export const BOARD_SIZE = 25
export const SPEED_SEED = 500
export const TOP_SPEED = 35

export const DIRECTIONS = {
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
} as const

export const GAME_MODES = {
  GAME_OVER: 'GAME_OVER',
  STARTED: 'STARTED',
  UNSTARTED: 'UNSTARTED',
  WON: 'WON',
} as const

export const KEYS = {
  SPACE: 32,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
} as const

export const TILE_TYPES = {
  EMPTY: 'empty',
  FOOD: 'food',
  SNAKE: 'snake',
} as const
