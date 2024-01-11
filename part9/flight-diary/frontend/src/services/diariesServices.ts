import axios from "axios";

const baseUrl = "http://localhost:3000";

const getDiaries = async() => {
    const res = await axios.get(`${baseUrl}/api/diaries`);
    return res.data;
}

export default {
  getDiaries,
};