import React from 'react'
import PropTypes from 'prop-types'
import Square from './Square'

const mapRowToSquares = (row) =>
  row.map((x, i) => <Square key={i} occupiedBy={x} />)

const Row = ({ row }) => <div className="game-row">{mapRowToSquares(row)}</div>

Row.propTypes = {
  row: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default Row
