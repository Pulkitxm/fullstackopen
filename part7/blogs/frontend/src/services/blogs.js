import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async ({ newObject, token }) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const update = async (id, newObject) => {
  return axios
    .put(`${baseUrl}/${id}`, newObject)
    .then((response) => response.data);
};

const Delete = async (id, newObject) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const getComments = async(id) => {
  return await axios.get(`${baseUrl}/${id}/comments`).then(i=>i.data)
}

const addComments = async(id,comment) => {
  return await axios.post(`${baseUrl}/${id}/comments`,{comment}).then(i=>i.data)
}

export default { getAll, create, update, Delete,getComments,addComments };
