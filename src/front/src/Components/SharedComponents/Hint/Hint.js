import React, { useEffect, useState } from 'react'
import './Hint.css'

export default function Hint({ hint, hintChanges }) {
  const defaultHint =
    'Left click on a ship. Then choose a place to put it and left click again. Right click to rotate the ship.'
  const defaultStyle = {
    fontWeight: 'normal',
    color: 'black',
  }
  const [text, setText] = useState(defaultHint)
  const [style, setStyle] = useState(defaultStyle)
  const alertStyle = {
    fontWeight: 'bold',
    color: 'red',
  }

  useEffect(() => {
    if (hint === undefined) return
    setText(hint)
    setStyle(alertStyle)
    const resetHintToDefault = setTimeout(() => {
      setText(defaultHint)
      setStyle(defaultStyle)
    }, 5000)
    return () => clearTimeout(resetHintToDefault)
  }, [hintChanges])

  return (
    <div className="Hints" style={style}>
      <p>{text}</p>
    </div>
  )
}
