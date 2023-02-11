import React from 'react'
import { useNavigate } from 'react-router-dom'
import { setUserName } from '../../../Utils/BattleshipAPI'
import './ButtonLink.css'

export default function ButtonLink({
  fleetReady,
  userName,
  userId,
  updateHint,
}) {
  const navigate = useNavigate()

  const handleEnter = (e) => {
    if (fleetReady && userName !== '') {
      e.target.style.transform = 'scale(1.1)'
      e.target.style.boxShadow = '2px 4px 50px 0 rgba(0, 0, 0, 0.25)'
    }
  }

  const handleLeave = (e) => {
    if (fleetReady && userName !== '') {
      e.target.style.transform = 'scale(1)'
      e.target.style.boxShadow = '2px 4px 10px 0 rgba(0, 0, 0, 0.25)'
    }
  }

  const handleClick = async () => {
    if (fleetReady && userName !== '') {
      await setUserName(userName)
      navigate('/game', {
        state: {
          userId: userId,
          userName: userName,
        },
      })
    } else if (fleetReady && userName === '')
      updateHint('Before the game begins please enter your name')
    else updateHint('To begin the game please put all of your ships on the map')
  }

  return (
    <button
      className="Play"
      data-testid="play-button"
      style={{
        backgroundColor:
          fleetReady && userName !== '' ? 'lightseagreen' : 'gray',
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onClick={handleClick}
    >
      Play
    </button>
  )
}
