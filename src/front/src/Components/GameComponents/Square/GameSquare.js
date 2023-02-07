import React, { useState, useEffect } from 'react'
import './GameSquare.css'

export default function Square({ coordinates, status, opponent, ship, shoot }) {
  const [color, setColor] = useState('')

  useEffect(() => {
    if (status === 'NOT_SHOT' && ship) setColor('rgba(230, 202, 50, 0.8)')
    else if (status === 'NOT_SHOT')
      setColor(opponent ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.2)')
    else if (status === 'MISS')
      setColor(opponent ? 'rgba(12, 164, 232, 0.6)' : 'rgba(12, 164, 232, 0.6)')
    else if (status === 'HIT') setColor('rgba(250, 0, 0, 0.6)')
  }, [status])

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
        backgroundColor: color,
      }}
      onClick={opponent ? handleClick : null}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    ></div>
  )
}
