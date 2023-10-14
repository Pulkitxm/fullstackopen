import axios from "axios";
const baseUrl = "http://localhost:3003/api/users";

const getUser = async (id) => {
  const response = await axios.get(`${baseUrl}/${id}`);
  return response.data;
};

const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export { getUser,getUsers };
