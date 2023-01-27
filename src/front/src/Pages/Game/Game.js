import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGame, createOpponentBattleMap } from '../../Utils'
import Grid from '../../Components/GameComponents/Grid/GameGrid'
import Square from '../../Components/GameComponents/Square/GameSquare'
import './Game.css'

export default function Game() {
  const { state } = useLocation()
  const { userId, userName } = state
  const [userBattleMap, setUserBattleMap] = useState([])
  const [opponentBattleMap, setOpponentBattleMap] = useState([])
  const [opponentName, setOpponentName] = useState('')
  const [gameStatus, setGameStatus] = useState('')
  const [gameId, setGameId] = useState('')

  useEffect(() => {
    fetchGame().then((game) => {
      setGameId(game.gameId)
      setUserBattleMap(
        game.players.find((user) => user && user.playerId === userId).grid
          .battleMap
      )
      if (game.gameStatus === 'NEW') {
        setOpponentBattleMap(createOpponentBattleMap())
      } else {
        let opponentBattleMap = game.players.find(
          (user) => user && user.playerId !== userId
        ).grid.battleMap
        setOpponentBattleMap(mountOpponentBattleMap(opponentBattleMap))
      }
    })
  }, [])

  const mountOpponentBattleMap = (grid) => {
    return grid.map((row) => {
      return row.map((square) => {
        return {
          coordinates: {
            x: square.coordinates.x,
            y: square.coordinates.y,
          },
          status: square.status,
        }
      })
    })
  }

  return (
    <div className="Game">
      <h1>{gameId}</h1>
      <div className="Map">
        <Grid battleMap={userBattleMap} opponent={false} />
        <Grid battleMap={opponentBattleMap} opponent={true} />
      </div>
    </div>
  )
}
