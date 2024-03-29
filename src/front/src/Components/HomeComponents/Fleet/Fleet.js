import React from 'react'
import Ship from '../Ship/Ship'
import './Fleet.css'

export default function Fleet({ ships, selectedShip, setSelectedShip }) {
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
        return (
          <Ship
            ship={ship}
            key={ship.name}
            moveShip={moveShip}
            selectedShip={selectedShip}
            setSelectedShip={setSelectedShip}
            setSail={ship.setSail}
          />
        )
      })}
    </div>
  )
}
