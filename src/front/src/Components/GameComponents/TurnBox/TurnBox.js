import React, { useState, useEffect, useRef, useContext } from 'react'
import { ColorContext } from '../../../ColorContext'
import './TurnBox.css'

export default function TurnBox({ isUserTurn, gameStatus }) {
  const [text, setText] = useState('')
  useEffect(() => {
    setText(pickRightInfo(isUserTurn, gameStatus))
  }, [isUserTurn, gameStatus])

  useEffect(() => {
    changeFontColor(isUserTurn)
    if (gameStatus === 'IN_PROGRESS') flashWithColor(isUserTurn, 1000)
    else if (gameStatus === 'FINISHED') flash3times(isUserTurn, 500)
  }, [isUserTurn, gameStatus])

  const { transparentBlack, golden } = useContext(ColorContext)
  const boxRef = useRef(null)

  const pickRightInfo = (isUserTurn, gameStatus) => {
    if (gameStatus === 'NEW') return 'Awaiting other player...'
    else if (gameStatus === 'IN_PROGRESS')
      return isUserTurn ? 'Your Turn' : 'Opponent Turn'
    else return isUserTurn ? "You've won" : "You've lost"
  }

  const flash3times = async (isUserTurn, ms) => {
    boxRef.current.style.transition = `background-color ${ms}ms`
    for (let i = 0; i < 3; i++) {
      changeBackgroundColor(isUserTurn)
      await new Promise((resolve) =>
        setTimeout(() => {
          boxRef.current.style.background = transparentBlack
          resolve()
        }, ms)
      )
      await new Promise((resolve) => setTimeout(() => resolve(), ms))
    }
  }

  const flashWithColor = async (isUserTurn, ms) => {
    changeBackgroundColor(isUserTurn)
    setTimeout(() => {
      boxRef.current.style.background = transparentBlack
    }, ms)
  }

  const changeBackgroundColor = (isUserTurn) => {
    boxRef.current.style.background = isUserTurn
      ? 'rgba(0, 250, 112, 0.6)'
      : 'rgba(245, 133, 133, 0.6)'
  }

  const changeFontColor = (isUserTurn) => {
    boxRef.current.style.color = isUserTurn
      ? golden
      : 'rgba(245, 133, 133, 0.836)'
  }

  return (
    <div className="TurnBox" ref={boxRef}>
      {text}
    </div>
  )
}
