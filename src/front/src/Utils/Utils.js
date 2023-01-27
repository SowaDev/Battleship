import { fetchPutShip } from './BattleshipAPI'

export const putShip = async (x, y, selectedShip) => {
  let coordinatesList = []
  for (let i = 0; i < selectedShip.length; i++) {
    coordinatesList.push({
      x: selectedShip.vertical ? x + i : x,
      y: selectedShip.vertical ? y : y + i,
    })
  }
  return await fetchPutShip(coordinatesList, selectedShip.name)
}

export const createOpponentBattleMap = () => {
  let battleMap = []
  for (let i = 0; i < 10; i++) {
    let row = []
    for (let j = 0; j < 10; j++) {
      row.push({
        x: i,
        y: j,
        coordinates: {
          x: i,
          y: j,
        },
        status: 'NOT_SHOT',
      })
    }
    battleMap.push(row)
  }
  return battleMap
}

export const checkFleetReady = (fleet) => {
  return !fleet.some((ship) => ship.setSail === false)
}

export const setUserData = (
  userData,
  setUserId,
  setUserName,
  setGrid,
  setFleet
) => {
  setUserId(userData.playerId)
  setUserName(userData.name)
  setGrid(userData.grid)
  setFleet(userData.Fleet)
}
