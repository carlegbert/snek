import React from 'react';
import PropTypes from 'prop-types';
import { GAME_MODES } from './constants';

const getContent = (gameMode, score) => {
  switch (gameMode) {
    case GAME_MODES.UNSTARTED:
      return 'press space to start';
    case GAME_MODES.STARTED:
      return `use the arrow keys to move | score: ${score}`;
    case GAME_MODES.GAME_OVER:
      return `game over! press space | final score: ${score}`;
    case GAME_MODES.WON:
      return `you won!!! | final score: ${score}`;
    default:
      throw new Error(`Expected a valid game mode but got ${gameMode}`);
  }
};

const GameHeader = ({ gameMode, score }) => (
  <header className="header">
    <h1 className="title">
      {getContent(gameMode, score)}
    </h1>
  </header>
);

GameHeader.propTypes = {
  gameMode: PropTypes.string.isRequired,
  score: PropTypes.number,
};

GameHeader.defaultProps = {
  score: undefined,
};

export default GameHeader;
