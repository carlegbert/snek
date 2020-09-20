import React from 'react'
import PropTypes from 'prop-types'

const Square = ({ occupiedBy }) => (
  <div className={`game-square ${occupiedBy}-tile`} />
)

Square.propTypes = {
  occupiedBy: PropTypes.string.isRequired,
}

export default Square
