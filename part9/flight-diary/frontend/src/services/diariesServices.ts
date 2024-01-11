import axios from "axios";
import { DiaryType } from "../types";
const baseUrl = "http://localhost:3000";

const getDiaries = async() => {
    const res = await axios.get(`${baseUrl}/api/diaries`);
    return res.data;
}

const addDiary = async (values: DiaryType) => {
  const res = await axios
    .post<DiaryType>(`${baseUrl}/api/diaries`, values)
    .then((response) => response.data);
   return res;
};

export default {
  getDiaries,
  addDiary
};