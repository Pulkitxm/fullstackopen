import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = async ({ newObject , token}) => {
  const config = {
    headers: { Authorization: token },
  }

  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const update = async (id,newObject ) => {
  return axios.put(`${baseUrl}/${id}`, newObject).then(response => response.data)
}

const Delete = async (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`)
}

export default { getAll, create, update, Delete }