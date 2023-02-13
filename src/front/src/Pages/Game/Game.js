import React, { useEffect, useState, useRef } from 'react'
import { useLocation } from 'react-router-dom'
import { fetchGame, sendShot } from '../../Utils/BattleshipAPI'
import { createOpponentBattleMap } from '../../Utils/Utils'
import './Game.css'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import Chat from '../../Components/GameComponents/Chat/Chat'
import TurnBox from '../../Components/GameComponents/TurnBox/TurnBox'
import DescribedGrid from '../../Components/GameComponents/DescribedGrid/DescribedGrid'

export default function Game() {
  const { state } = useLocation()
  const { userId, userName } = state
  const [gameId, setGameId] = useState('')
  const [userBattleMap, setUserBattleMap] = useState([])
  const [opponentBattleMap, setOpponentBattleMap] = useState([])
  const [opponentName, setOpponentName] = useState('')
  const [gameStatus, setGameStatus] = useState('')
  const [messageList, setMessageList] = useState([])
  const [isUserTurn, setIsUserTurn] = useState(false)

  useEffect(() => {
    fetchGame().then((game) => {
      const socket = new SockJS('http://localhost:8080/ws-game')
      const stompClient = Stomp.over(socket)
      stompClient.connect({}, (frame) => {
        stompClient.subscribe(`/game/${game.gameId}`, (jsonGame) => {
          const parsedGame = JSON.parse(jsonGame.body)
          setMapTurnAndStatus(parsedGame)
        })
      })
      setGameId(game.gameId)
      setMessageList(game.messageList)
      setMapTurnAndStatus(game)
    })
  }, [])

  const setMapTurnAndStatus = (game) => {
    setBattleMaps(game)
    isUserTurnNow(game.playerTurn)
    setGameStatus(game.gameStatus)
  }

  const isUserTurnNow = (turnsPlayerId) => {
    setIsUserTurn(userId === turnsPlayerId ? true : false)
  }

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
    <div className="GamePage">
      <div className="Game">
        <div className="Map">
          <DescribedGrid battleMap={userBattleMap} opponent={false} />
          <div className="Center">
            <TurnBox isUserTurn={isUserTurn} gameStatus={gameStatus} />
            <Chat
              gameId={gameId}
              userId={userId}
              userName={userName}
              messageList={messageList}
              setMessageList={setMessageList}
            />
          </div>
          <DescribedGrid
            battleMap={opponentBattleMap}
            opponent={true}
            shoot={shoot}
            isUserTurn={isUserTurn}
          />
        </div>
      </div>
    </div>
  )
}
