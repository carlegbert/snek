import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import {
  BOARD_SIZE,
  DIRECTIONS,
  EMPTY,
  FOOD,
  KEYS,
  SNAKE,
} from './constants';
import {
  createBoard,
  directionsAreOpposite,
  getRandomDirection,
  getRandomEmptyLocation,
  movePoint,
  calculateSpeed,
} from './util';

import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardSize: BOARD_SIZE,
      started: false,
      score: null,
      speed: null,
      board: null,
      direction: null,
      snake: null,
    };
    this.newDirection = null;
  }

  handleKeyDown(e) {
    if (this.state.started)
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
    const speed = calculateSpeed(score);

    this.setState({
      board,
      speed,
      started: true,
      direction: getRandomDirection(),
      snake: [{x: center, y: center}],
    });
    this.updateClock(speed);
  }

  updateClock(speed) {
    clearInterval(this.intervalHandle);
    setTimeout(() => {
      this.intervalHandle = setInterval(this.moveSnake.bind(this), speed);
    }, speed);
  }

  moveSnake() {
    const snake = this.state.snake.slice();
    const board = this.state.board.map(row => row.map(square => square));
    const direction = this.newDirection || this.state.direction;
    const newState = { snake, board, direction, newDirection: null };
    const newSnakeHead = movePoint(snake[0], direction);

    if (board[newSnakeHead.y][newSnakeHead.x] === FOOD) {
      newState.score = this.state.score + 1;
      newState.speed = calculateSpeed(newState.score);
      this.updateClock(newState.speed);
      const food = getRandomEmptyLocation(board);
      board[food.y][food.x] = FOOD;
    } else {
      const oldSnakeTail = snake.pop();
      board[oldSnakeTail.y][oldSnakeTail.x] = EMPTY;
    }
    snake.splice(0, 0, newSnakeHead);
    board[newSnakeHead.y][newSnakeHead.x] = SNAKE;
    this.setState(newState);
  }

  changeSnakeDirection(newDirection) {
    if (this.state.direction === newDirection || directionsAreOpposite(this.state.direction, newDirection))
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
          started={this.state.started}
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
