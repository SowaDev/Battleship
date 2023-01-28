import React from 'react'
import './GameSquare.css'

export default function Square({ coordinates, status, opponent, ship, shoot }) {
  const setColor = () => {
    if (status === 'NOT_SHOT' && ship) return 'gray'
    else if (status === 'NOT_SHOT') return opponent ? 'gray' : 'lightblue'
    else if (status === 'MISS') return opponent ? 'lightblue' : 'orange'
    else if (status === 'HIT') return 'red'
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
