import React from 'react'
import './GameSquare.css'

export default function Square({ x, y, status, opponent, ship }) {
  const setColor = () => {
    if (status === 'NOT_SHOT' && ship) return 'gray'
    else if (status === 'NOT_SHOT') return opponent ? 'gray' : 'lightblue'
    else if (status === 'MISS') return opponent ? 'lightblue' : 'orange'
    else if (status === 'HIT') return 'red'
  }
  return (
    <div
      className="GameSquare"
      style={{
        backgroundColor: setColor(),
      }}
    ></div>
  )
}
