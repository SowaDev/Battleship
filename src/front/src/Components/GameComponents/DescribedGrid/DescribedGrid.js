import React from 'react'
import Grid from '../Grid/GameGrid'
import './DescribedGrid.css'

export default function DescribedGrid({
  battleMap,
  opponent,
  shoot,
  isUserTurn,
}) {
  const lettersArray = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J']
  const numbersArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  const renderDescription = (array) => {
    return array.map((letter, i) => {
      return (
        <div
          className="DescriptionSquare"
          key={`${letter}${i}`}
          style={
            {
              // lineHeight: opponent ? '3vw' : '2vw',
            }
          }
        >
          {letter}
        </div>
      )
    })
  }

  const letters = renderDescription(lettersArray)
  const numbers = renderDescription(numbersArray)

  return (
    <div className="DescribedGrid">
      <div
        className="NumbersColumn"
        style={{
          height: opponent ? '30vw' : '20vw',
          width: opponent ? '3vw' : '2vw',
          marginTop: opponent ? 'calc(3vw - 2px)' : 'calc(2vw - 2px)',
          // fontWeight: opponent ? '600' : '500',
          fontSize: opponent ? '1.5vw' : '1vw',
        }}
      >
        {numbers}
      </div>
      <div className="BoxWithLetters">
        <div
          className="LettersRow"
          style={{
            height: opponent ? '3vw' : '2vw',
            width: opponent ? '30vw' : '20vw',
            // fontWeight: opponent ? '600' : '500',
            fontSize: opponent ? '1.5vw' : '1vw',
          }}
        >
          {letters}
        </div>
        <Grid
          battleMap={battleMap}
          opponent={opponent}
          shoot={shoot}
          isUserTurn={isUserTurn}
        />
      </div>
    </div>
  )
}
