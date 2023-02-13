import React, { useState, useEffect, useContext } from 'react'
import { ColorContext } from '../../../ColorContext'
import './GameSquare.css'

export default function Square({
  coordinates,
  status,
  opponent,
  ship,
  shoot,
  isUserTurn,
}) {
  const [color, setColor] = useState('')
  const { hitRed, transparentBlack, oceanBlue, golden, transparentBlack1 } =
    useContext(ColorContext)

  useEffect(() => {
    if (status === 'NOT_SHOT' && ship) setColor(golden)
    else if (status === 'NOT_SHOT') setColor(transparentBlack1)
    else if (status === 'MISS') setColor(oceanBlue)
    else if (status === 'HIT') setColor(hitRed)
  }, [status])

  const handleClick = () => {
    shoot(coordinates)
  }

  const handleMouseEnter = (e) => {
    if (isUserTurn && opponent && status === 'NOT_SHOT') {
      e.target.style.backgroundColor = golden
    }
  }

  const handleMouseLeave = (e) => {
    if (isUserTurn && opponent && status === 'NOT_SHOT') {
      e.target.style.backgroundColor = transparentBlack1
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
