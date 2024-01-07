import * as React from 'react'
import Row from './Row'
import { BoardState } from './types'

type Props = {
  board: BoardState | null
}

const GameBoard: React.FC<Props> = ({ board }) => (
  <div className="game-board">
    {board?.map((row, i) => <Row row={row} key={i} />)}
  </div>
)

export default GameBoard
