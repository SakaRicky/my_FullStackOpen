import axios from 'axios'
const baseUrl = '/api/blogs'
const loginUrl = '/api/login'

let token = null

const setToken = given_token => {
  token = `bearer ${given_token}` 
}

const login = async credentials => {
  const response = await axios.post(loginUrl, credentials)
  return response.data
}

const getAll = async () => {
  const config = { 
    headers: { authorization: token }
   }
  const response = await axios.get(baseUrl, config)
  return response.data
}

const create = async blog => {
  const config = { 
    headers: { authorization: token }
   }
  
   const response = await axios.post(baseUrl, blog, config)
   return response
}

export default { getAll, login, setToken, create, token }