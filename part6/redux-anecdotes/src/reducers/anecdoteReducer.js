import { createSlice } from '@reduxjs/toolkit'

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
    voteAnecdote(state,action){
      const id = action.payload;
      return state.map(i=>i.id!=id?i:{...i,votes:i.votes+1})
    },
    addAnectode(state,action){
      return state.concat({
        content: action.payload,
        id: getId(),
        votes: 0
      })
    }
  }
})

export const {voteAnecdote,addAnectode} = anecdoteSlice.actions
export default anecdoteSlice.reducer