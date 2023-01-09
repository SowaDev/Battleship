import React from 'react'
import './Hint.css'

export default function Hint() {
  const defaultHint =
    'Left click on a ship. Then choose a place to put it and left click again. Right click to rotate the ship.'
  return (
    <div className="Hints">
      <p>{defaultHint}</p>
    </div>
  )
}
