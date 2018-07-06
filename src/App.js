import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import {
  BOARD_SIZE,
  DIRECTIONS,
  EMPTY,
  FOOD,
  GAME_MODES,
  KEYS,
  SNAKE,
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

import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardSize: BOARD_SIZE,
      gameMode: GAME_MODES.UNSTARTED,
      score: null,
      board: null,
    };
    this.speed = null;
    this.direction = null;
    this.snake = null;
    this.newDirection = null;
  }

  handleKeyDown(e) {
    if (this.state.gameMode === GAME_MODES.STARTED)
      this.handleGameStartedKeyDown(e);
    else
      this.handleGameStoppedKeyDown(e);
  }

  handleGameStoppedKeyDown(e) {
    if (e.which === KEYS.SPACE) {
      e.preventDefault();
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
    const center = Math.floor(this.state.boardSize / 2);
    const board = createBoard(BOARD_SIZE);
    board[center][center] = SNAKE;
    const food = getRandomEmptyLocation(board);
    board[food.y][food.x] = FOOD;
    const score = 0;
    this.speed = calculateSpeed(score);
    this.snake = [{x: center, y: center}];
    this.direction = getRandomDirection();

    this.setState({
      score,
      board,
      gameMode: GAME_MODES.STARTED,
    });
    this.updateClock();
  }

  updateClock() {
    clearInterval(this.intervalHandle);
    setTimeout(() => {
      this.intervalHandle = setInterval(this.moveSnake.bind(this), this.speed);
    }, this.speed);
  }

  moveSnake() {
    const board = this.state.board.map(row => row.map(square => square));
    this.direction = this.newDirection || this.direction;
    this.newDirection = null;
    const newState = { board };
    const newSnakeHead = movePoint(this.snake[0], this.direction);

    if (!newSpaceIsValid(newSnakeHead, board)) {
      newState.gameMode = GAME_MODES.GAME_OVER;
    } else if (board[newSnakeHead.y][newSnakeHead.x] === FOOD) {
      newState.score = this.state.score + 1;
      this.snake.splice(0, 0, newSnakeHead);
      board[newSnakeHead.y][newSnakeHead.x] = SNAKE;

      const food = getRandomEmptyLocation(board);
      if (food) {
        board[food.y][food.x] = FOOD;
        this.speed = calculateSpeed(newState.score);
        this.updateClock(newState.speed);
      } else {
        newState.gameMode = GAME_MODES.WON;
        clearInterval(this.intervalHandle);
      }
    } else {
      const oldSnakeTail = this.snake.pop();
      board[oldSnakeTail.y][oldSnakeTail.x] = EMPTY;
      this.snake.splice(0, 0, newSnakeHead);
      board[newSnakeHead.y][newSnakeHead.x] = SNAKE;
    }
    this.setState(newState);
  }

  changeSnakeDirection(newDirection) {
    if (this.direction === newDirection || directionsAreOpposite(this.direction, newDirection))
      return;
    this.newDirection = newDirection;
  }

  render() {
    return (
      <div
        className="app"
        onKeyDown={this.handleKeyDown.bind(this)}
        tabIndex="0"
      >
        <GameHeader
          gameMode={this.state.gameMode}
          score={this.state.score}
        />
        <GameBoard
          boardSize={this.state.boardSize}
          board={this.state.board}
        />
      </div>
    );
  }
}

export default App;
