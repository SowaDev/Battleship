import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGame, createOpponentBattleMap } from '../../Utils'
import Grid from '../../Components/GameComponents/Grid/Grid'
import Square from '../../Components/GameComponents/Square/Square'
import './Game.css'

export default function Game() {
  const { state } = useLocation()
  const { userId, userName } = state
  const [userBattleMap, setUserBattleMap] = useState([])
  const [opponentBattleMap, setOpponentBattleMap] = useState([])
  const [opponentName, setOpponentName] = useState('')
  const [gameStatus, setGameStatus] = useState('')

  useEffect(() => {
    console.log(userId)
    fetchGame().then((game) => {
      setUserBattleMap(
        game.players.find((user) => user && user.playerId === userId).grid
          .battleMap
      )
      if (game.gameStatus === 'NEW') {
        let opon = createOpponentBattleMap()
        console.log(opon)
        setOpponentBattleMap(createOpponentBattleMap())
      } else {
        setOpponentBattleMap(mountOpponentBattleMap())
      }
    })
  }, [])

  const mountOpponentBattleMap = (grid) => {}

  return (
    <div className="Game">
      <h1>{userId}</h1>
      <div className="Map">
        <Grid battleMap={userBattleMap} />
        <Grid battleMap={opponentBattleMap} />
      </div>
    </div>
  )
}
