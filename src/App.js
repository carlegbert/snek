import React, { Component } from 'react';
import GameBoard from './GameBoard';
import GameHeader from './GameHeader';
import { BOARD_SIZE, DIRECTIONS, EMPTY, KEYS, SNAKE } from './constants';
import { createBoard, directionsAreOpposite, getRandomDirection, movePoint } from './util';

import './index.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      boardSize: BOARD_SIZE,
      started: false,
      score: 0,
      board: null,
      snakeDirection: null,
      snake: null,
    };
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

    this.setState({
      board,
      started: true,
      snakeDirection: getRandomDirection(),
      snakeSpeed: 1000,
      snake: [{x: center, y: center}],
    });
    this.startSnake();
  }

  startSnake() {
    setTimeout(() => {
      this.intervalHandle = setInterval(this.moveSnake.bind(this), this.state.snakeSpeed);
    }, this.state.snakeSpeed);
  }

  moveSnake() {
    const newSnakeHead = movePoint(this.state.snake[0], this.state.snakeDirection);
    const oldSnakeTail = this.state.snake.slice(-1)[0];
    const snake = [newSnakeHead, ...this.state.snake.slice(0, -1)];
    const board = this.state.board.map(row => row.map(square => square));
    board[newSnakeHead.y][newSnakeHead.x] = SNAKE;
    board[oldSnakeTail.y][oldSnakeTail.x] = EMPTY;
    this.setState({ snake, board });
  }

  changeSnakeDirection(direction) {
    if (this.state.snakeDirection === direction || directionsAreOpposite(this.state.snakeDirection, direction))
      return;
    this.setState({ snakeDirection: direction });
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
