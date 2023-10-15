import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const anecdoteSlice = createSlice({
  name:"anecdote",
  initialState:[],
  reducers:{
    addAnectode(state,action){
      return state.concat({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    },
    appendAnectode(state,action){
      return JSON.parse(JSON.stringify(state)).concat(action.payload)
    },
    setAnectode(state,action){
      return action.payload
    }
  }
})

export const {addAnectode} = anecdoteSlice.actions
export default anecdoteSlice.reducer

export const initialAnecdotes = () => {
  return async dispatch => {
    await anecdoteService.getAll().then((res)=>{
      dispatch({ type: 'anecdote/setAnectode', payload: res })
    })
  }
}

export const createAnecdotes = (content) => {
  return async dispatch => {
    const newNote = await anecdoteService.addAnecdote(content)
    dispatch({ type: 'anecdote/appendAnectode', payload:newNote })
  }
}

export const voteAnecdote = (id,anecdotes) => {
  return async dispatch => {
    const selectedAnecdoteContent = anecdotes.filter(i=>i.id==id)[0].content;
    const serverID = await  anecdoteService.getAll().then(res=>res.filter(i=>i.content==selectedAnecdoteContent)[0].id)
    anecdoteService.voteAnecdote(serverID)
    anecdotes = anecdotes.map(anecdote=>{
      if (anecdote.id==id){
        return {...anecdote,votes:anecdote.votes+1}
      }
      return anecdote
    })
    dispatch({ type: 'anecdote/setAnectode', payload:anecdotes })
  }
}