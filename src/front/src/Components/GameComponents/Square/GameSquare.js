import React from 'react'
import './GameSquare.css'

export default function Square({ coordinates, status, opponent, ship, shoot }) {
  const setColor = () => {
    if (status === 'NOT_SHOT' && ship) return 'rgba(230, 202, 50, 0.8)'
    else if (status === 'NOT_SHOT')
      return opponent ? 'rgba(108, 122, 137, 0.6)' : 'rgba(53, 119, 122, 0.3)'
    else if (status === 'MISS')
      return opponent ? 'rgba(12, 164, 232, 0.6)' : 'rgba(12, 164, 232, 0.6)'
    else if (status === 'HIT') return 'rgba(250, 0, 0, 0.6)'
  }

  const handleClick = () => {
    shoot(coordinates)
  }

  return (
    <div
      className="GameSquare"
      style={{
        backgroundColor: setColor(),
      }}
      onClick={opponent ? handleClick : null}
    ></div>
  )
}
