import * as React from 'react'
import { GAME_MODES } from './constants'
import { GameMode } from './types'

type Props = {
  gameMode: GameMode
  score: number
}

const getContent = (gameMode: GameMode, score: number): string => {
  switch (gameMode) {
    case GAME_MODES.UNSTARTED:
      return 'press space to start'
    case GAME_MODES.STARTED:
      return `use the arrow keys to move | score: ${score}`
    case GAME_MODES.GAME_OVER:
      return `game over! press space | final score: ${score}`
    case GAME_MODES.WON:
      return `you won!!! | final score: ${score}`
    default:
      throw new Error(`Expected a valid game mode but got ${gameMode}`)
  }
}

const GameHeader: React.FC<Props> = ({ gameMode, score }) => (
  <header className="header">
    <h1 className="title">{getContent(gameMode, score)}</h1>
  </header>
)

export default GameHeader
