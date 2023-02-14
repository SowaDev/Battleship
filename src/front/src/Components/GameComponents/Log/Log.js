import React, { useContext, useState } from 'react'
import { ColorContext } from '../../../Context/ColorContext'
import './Log.css'

export default function Log({
  userId,
  playerId,
  playerName,
  coordinates,
  shotResult,
  sunkenShipName,
  setLogList,
}) {
  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const { golden, red } = useContext(ColorContext)

  const sunkingMessage =
    `${userId === playerId ? 'You have' : playerName + ' has'} just sunken ` +
    `${userId === playerId ? 'enemy ' : 'your '}` +
    sunkenShipName

  const regularMessage =
    `${shotResult === 'HIT' ? ' Hit on ' : ' Miss on '}` +
    `${letters[coordinates.y]}${coordinates.x}`

  // const alignItems = () => {
  //   if (sunkenShipName) return 'center'
  //   return userId === playerId ? 'flex-start' : 'flex-end'
  // }

  return (
    <>
      <div
        className="Log"
        style={{ alignItems: userId === playerId ? 'flex-start' : 'flex-end' }}
      >
        <p
          style={{
            color: userId === playerId ? golden : red,
            fontSize: '0.7wv',
          }}
        >
          {regularMessage}
        </p>
      </div>
      {sunkenShipName && (
        <div className="Log" style={{ alignItems: 'center' }}>
          <p
            style={{
              color: userId === playerId ? golden : red,
              fontSize: '1vw',
            }}
          >
            {sunkingMessage}
          </p>
        </div>
      )}
    </>
  )
}
