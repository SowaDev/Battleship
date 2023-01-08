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

export const placeShip = async (x, y, selectedShip) => {
  let coordinatesList = []
  for (let i = 0; i < selectedShip.length; i++) {
    coordinatesList.push({
      x: selectedShip.vertical ? x + i : x,
      y: selectedShip.vertical ? y : y + i,
    })
  }
  return await fetchPlaceShip(coordinatesList, selectedShip.name)
}

export const fetchPlaceShip = async (coordinatesList, shipName) => {
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
