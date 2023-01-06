import React from 'react'
import Ship from '../Ship/Ship'
import './Fleet.css'

export default function Fleet({
  ships,
  sizeUnit,
  selectedShip,
  setSelectedShip,
}) {
  const moveShip = (ship) => {
    if (selectedShip === ship) {
      setSelectedShip(null)
    } else {
      setSelectedShip(ship)
    }
  }

  return (
    <div className="Fleet" data-testid="fleet">
      {ships.map((ship) => {
        if (ship.setSail) return null
        return (
          <Ship
            ship={ship}
            sizeUnit={sizeUnit}
            key={ship.name}
            moveShip={moveShip}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
          />
        )
      })}
    </div>
  )
}
