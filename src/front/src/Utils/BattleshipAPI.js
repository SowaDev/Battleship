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

export const sendShot = async (shot) => {
  try {
    const response = await axios({
      method: 'post',
      url: baseUrl + 'shoot',
      data: shot,
      withCredentials: true,
    })
    return response.data
  } catch (e) {
    console.error(e)
  }
}
