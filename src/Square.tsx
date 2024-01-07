import * as React from 'react'
import { TileType } from './types'

type Props = {
  occupiedBy: TileType
}

const Square: React.FC<Props> = ({ occupiedBy }) => (
  <div className={`game-square ${occupiedBy}-tile`} />
)

export default Square
