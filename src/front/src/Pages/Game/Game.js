import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function Game() {
  const { state } = useLocation()
  const [game, setGame] = useState(state)

  return (
    <div>
      <h1>Game</h1>
      <div>GAME</div>
    </div>
  )
}
