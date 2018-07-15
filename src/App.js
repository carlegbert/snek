import React, { Component } from 'react';
import Footer from './Footer';

import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import {
  BOARD_SIZE,
  DIRECTIONS,
  GAME_MODES,
  KEYS,
  TILE_TYPES,
} from './constants';
import {
  calculateSpeed,
  createBoard,
  directionsAreOpposite,
  getRandomDirection,
  getRandomEmptyLocation,
  movePoint,
  newSpaceIsValid,
} from './util';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardSize: BOARD_SIZE,
      gameMode: GAME_MODES.UNSTARTED,
      score: null,
      board: null,
    };
    this.direction = null;
    this.snake = null;
    this.newDirection = null;
  }

  componentDidMount() {
    /* eslint-env browser */
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  componentDidUpdate() {
    const { gameMode } = this.state;
    if (gameMode === GAME_MODES.STARTED) this.queueSnakeMove();
  }

  handleKeyDown(e) {
    const { gameMode } = this.state;
    if (!Object.values(KEYS).includes(e.which)) return;
    e.preventDefault();
    if (gameMode === GAME_MODES.STARTED) this.handleGameStartedKeyDown(e);
    else this.handleGameStoppedKeyDown(e);
  }

  handleGameStoppedKeyDown(e) {
    if (e.which === KEYS.SPACE) {
      this.startGame();
    }
  }

  handleGameStartedKeyDown(e) {
    switch (e.which) {
      case KEYS.UP:
      case KEYS.K:
        this.changeSnakeDirection(DIRECTIONS.UP);
        break;
      case KEYS.DOWN:
      case KEYS.J:
        this.changeSnakeDirection(DIRECTIONS.DOWN);
        break;
      case KEYS.LEFT:
      case KEYS.H:
        this.changeSnakeDirection(DIRECTIONS.LEFT);
        break;
      case KEYS.RIGHT:
      case KEYS.L:
        this.changeSnakeDirection(DIRECTIONS.RIGHT);
        break;
      default:
        break;
    }
  }

  startGame() {
    const { boardSize } = this.state;
    const center = Math.floor(boardSize / 2);
    const board = createBoard(BOARD_SIZE);
    board[center][center] = TILE_TYPES.SNAKE;
    const food = getRandomEmptyLocation(board);
    board[food.y][food.x] = TILE_TYPES.FOOD;
    const score = 0;
    this.snake = [{ x: center, y: center }];
    this.direction = getRandomDirection();

    this.setState({
      score,
      board,
      gameMode: GAME_MODES.STARTED,
    });
  }

  queueSnakeMove() {
    const { score } = this.state;
    const speed = calculateSpeed(score);
    setTimeout(this.moveSnake.bind(this), speed);
  }

  moveSnake() {
    let { board } = this.state;
    const { score } = this.state;
    board = board.map(row => row.slice());
    this.direction = this.newDirection || this.direction;
    this.newDirection = null;
    const newState = { board };
    const newSnakeHead = movePoint(this.snake[0], this.direction);

    if (!newSpaceIsValid(newSnakeHead, board)) {
      newState.gameMode = GAME_MODES.GAME_OVER;
    } else if (board[newSnakeHead.y][newSnakeHead.x] === TILE_TYPES.FOOD) {
      newState.score = score + 1;
      this.snake.splice(0, 0, newSnakeHead);
      board[newSnakeHead.y][newSnakeHead.x] = TILE_TYPES.SNAKE;

      const food = getRandomEmptyLocation(board);
      if (food) board[food.y][food.x] = TILE_TYPES.FOOD;
      else newState.gameMode = GAME_MODES.WON;
    } else {
      const oldSnakeTail = this.snake.pop();
      board[oldSnakeTail.y][oldSnakeTail.x] = TILE_TYPES.EMPTY;
      this.snake.splice(0, 0, newSnakeHead);
      board[newSnakeHead.y][newSnakeHead.x] = TILE_TYPES.SNAKE;
    }
    this.setState(newState);
  }

  changeSnakeDirection(newDirection) {
    if (!directionsAreOpposite(this.direction, newDirection)) this.newDirection = newDirection;
  }

  render() {
    const {
      board,
      boardSize,
      gameMode,
      score,
    } = this.state;
    return (
      <div className="app">
        <GameHeader
          gameMode={gameMode}
          score={score}
        />
        <GameBoard
          boardSize={boardSize}
          board={board}
        />
        <Footer />
      </div>
    );
  }
}

export default App;
