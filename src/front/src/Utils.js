import axios from 'axios'

const baseUrl = 'http://localhost:8080/'

export const fetchUser = async (url) => {
  try {
    const response = await axios({
      method: 'get',
      url: url,
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

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

export const fetchPutShip = async (coordinatesList, shipName) => {
  let shipPlacement = {
    shipName: shipName,
    coordinatesList: coordinatesList,
  }
  try {
    const response = await axios({
      method: 'put',
      url: baseUrl,
      data: shipPlacement,
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const removeShip = async (shipName) => {
  try {
    const response = await axios({
      method: 'delete',
      url: baseUrl,
      data: shipName,
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const randomPlacement = async () => {
  try {
    const response = await axios({
      method: 'put',
      url: baseUrl + 'randomPlacement',
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const removeShips = async () => {
  try {
    const response = await axios({
      method: 'put',
      url: baseUrl + 'removeShips',
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const play = async (userName) => {
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl + 'play',
      data: userName,
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const fetchGame = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: baseUrl + 'game',
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const createOpponentBattleMap = () => {
  let battleMap = []
  for (let i = 0; i < 10; i++) {
    let row = []
    for (let j = 0; j < 10; j++) {
      row.push({
        x: i,
        y: j,
        wasShot: false,
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
