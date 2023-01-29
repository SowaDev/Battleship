import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGame, sendShot } from '../../Utils/BattleshipAPI'
import { createOpponentBattleMap } from '../../Utils/Utils'
import Grid from '../../Components/GameComponents/Grid/GameGrid'
import './Game.css'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'

export default function Game() {
  const { state } = useLocation()
  const { userId, userName, gameId } = state
  const [userBattleMap, setUserBattleMap] = useState([])
  const [opponentBattleMap, setOpponentBattleMap] = useState([])
  const [opponentName, setOpponentName] = useState('')
  const [gameStatus, setGameStatus] = useState('')

  useEffect(() => {
    fetchGame().then((game) => {
      const socket = new SockJS('http://localhost:8080/ws-game')
      const stompClient = Stomp.over(socket)
      stompClient.connect({}, (frame) => {
        console.log('Connected: ' + frame)
        stompClient.subscribe(`/topic/game/${gameId}`, (gamex) => {
          setBattleMaps(JSON.parse(gamex.body))
        })
      })
      setBattleMaps(game)
    })
  }, [gameId])

  const setBattleMaps = (game) => {
    game.players.forEach((user) => {
      if (!user) setOpponentBattleMap(createOpponentBattleMap())
      else if (user.playerId === userId) setUserBattleMap(user.grid.battleMap)
      else if (user.playerId !== userId)
        setOpponentBattleMap(mountOpponentBattleMap(user.grid))
    })
  }

  const mountOpponentBattleMap = (grid) => {
    return grid.battleMap.map((row) => {
      return row.map((square) => {
        return {
          coordinates: square.coordinates,
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
    await sendShot(shot)
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
