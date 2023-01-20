import React from 'react'
import './Ship.css'

export default function Ship({ ship, sizeUnit, moveShip, selectedShip }) {
  const { length, name } = ship

  const handleClick = () => {
    moveShip(ship)
  }

  return (
    <button
      className="Ship"
      data-testid={name}
      onClick={handleClick}
      style={{
        width: length * sizeUnit,
        height: sizeUnit,
        backgroundColor: selectedShip === ship ? 'indianred' : 'darkolivegreen',
      }}
    >
      {name}
    </button>
  )
}
