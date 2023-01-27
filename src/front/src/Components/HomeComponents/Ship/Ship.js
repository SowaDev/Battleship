import React from 'react'
import './Ship.css'

export default function Ship({ ship, setSail, moveShip, selectedShip }) {
  const { length, name } = ship
  const minSize = 42
  const handleClick = () => {
    moveShip(ship)
  }

  return (
    <button
      className="Ship"
      data-testid={name}
      onClick={handleClick}
      style={{
        width: `${length * 3}vw`,
        minWidth: minSize * length,
        visibility: setSail ? 'hidden' : 'visible',
        backgroundColor:
          selectedShip === ship ? 'indianred' : 'rgba(230, 202, 50, 0.8)',
      }}
    >
      {name}
    </button>
  )
}
