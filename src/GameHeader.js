import React from 'react';

const GameHeader = ({ started, score }) => {
  const content = started
    ? `use the arrow keys to move | score: ${score}`
    : 'press space to start';
  return (
    <header className="header">
      <h1 className="title">
        {content}
      </h1>
    </header>
  );
};

export default GameHeader;
