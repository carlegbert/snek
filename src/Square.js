import React from 'react';

const Square = props => <div className={`game-square ${props.occupiedBy}-tile`} />;

export default Square;
