import axios from 'axios'

export const fetchUser = async(url) => {
  try {
    const response = await axios.get(url)
    return response.data
  } catch (e) {
    console.error(e)
  }
}