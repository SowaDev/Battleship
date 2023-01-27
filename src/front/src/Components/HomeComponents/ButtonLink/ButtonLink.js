import React from 'react'
import { useNavigate } from 'react-router-dom'
import { play } from '../../../Utils'
import './ButtonLink.css'

export default function ButtonLink({ fleetReady, userName, updateHint }) {
  const navigate = useNavigate()

  const handleEnter = (e) => {
    if (fleetReady) {
      e.target.style.transform = 'scale(1.1)'
      e.target.style.boxShadow = '2px 4px 50px 0 rgba(0, 0, 0, 0.25)'
    }
  }

  const handleLeave = (e) => {
    if (fleetReady) {
      e.target.style.transform = 'scale(1)'
      e.target.style.boxShadow = '2px 4px 10px 0 rgba(0, 0, 0, 0.25)'
    }
  }

  const handleClick = async () => {
    if (fleetReady && userName !== '') {
      let newGame = await play(userName)
      navigate('/game', { state: newGame })
    } else if (fleetReady && userName === '')
      updateHint('Before the game begins please enter your name')
  }

  return (
    <button
      className="Play"
      style={{
        backgroundColor: fleetReady ? 'lightseagreen' : 'gray',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      Play
    </button>
  )
}
