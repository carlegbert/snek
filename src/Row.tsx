import * as React from 'react'
import Square from './Square'
import { TileType } from './types'

type Props = {
  row: TileType[]
}

const Row: React.FC<Props> = ({ row }) => (
  <div className="game-row">
    {row.map((x, i) => (
      <Square key={i} occupiedBy={x} />
    ))}
  </div>
)

export default Row
