import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGame, sendShot } from '../../Utils/BattleshipAPI'
import { createOpponentBattleMap } from '../../Utils/Utils'
import Grid from '../../Components/GameComponents/Grid/GameGrid'
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
      setBattleMaps(game)
    })
  }, [])

  const setBattleMaps = (game) => {
    game.players.forEach((user) => {
      if (!user) setOpponentBattleMap(createOpponentBattleMap())
      else if (user.playerId === userId) setUserBattleMap(user.grid.battleMap)
      else if (user.playerId !== userId) mountOpponentBattleMap(user.grid)
    })
  }

  const mountOpponentBattleMap = (grid) => {
    return grid.battleMap.map((row) => {
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

  const shoot = async (coordinates) => {
    let shot = {
      coordinates: coordinates,
      playerId: userId,
      gameId: gameId,
    }
    setBattleMaps(await sendShot(shot))
  }

  return (
    <div className="Game">
      <h1>{gameId}</h1>
      <div className="Map">
        <Grid battleMap={userBattleMap} opponent={false} />
        <Grid battleMap={opponentBattleMap} opponent={true} shoot={shoot} />
      </div>
    </div>
  )
}
