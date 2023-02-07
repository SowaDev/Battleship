import React from 'react'
import './GameSquare.css'

export default function Square({ coordinates, status, opponent, ship, shoot }) {
  const setColor = () => {
    if (status === 'NOT_SHOT' && ship) return 'rgba(230, 202, 50, 0.8)'
    else if (status === 'NOT_SHOT')
      return opponent ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)'
    else if (status === 'MISS')
      return opponent ? 'rgba(12, 164, 232, 0.6)' : 'rgba(12, 164, 232, 0.6)'
    else if (status === 'HIT') return 'rgba(250, 0, 0, 0.6)'
  }

  const handleClick = () => {
    shoot(coordinates)
  }

  const handleMouseEnter = (e) => {
    if (opponent && status === 'NOT_SHOT') {
      e.target.style.backgroundColor = 'rgba(230, 202, 50, 0.8)'
    }
  }

  const handleMouseLeave = (e) => {
    if (opponent && status === 'NOT_SHOT') {
      e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)'
    }
  }

  return (
    <div
      className="GameSquare"
      style={{
        backgroundColor: setColor(),
      }}
      onClick={opponent ? handleClick : null}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  )
}
