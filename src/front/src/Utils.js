import axios from 'axios'

export const fetchUser = async(url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (e) {
    console.error(e)
  }
}

export const setUserData = (userData, setUserId, setUserName, setGrid, setFleet) => {
  setUserId(userData.playerId)
  setUserName(userData.name)
  setGrid(userData.grid)
  setFleet(userData.Fleet)
}