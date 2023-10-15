import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes"

export const fetchAll = () => axios.get(baseUrl).then((res) => res.data)

export const createAnecdote = (newNote) => axios.post(baseUrl, newNote).then((res) => res.data);

export const addVote = (updatedAnecdote) => 
  axios
    .put(`${baseUrl}/${updatedAnecdote.id}`, updatedAnecdote)
    .then((res) => res.data);