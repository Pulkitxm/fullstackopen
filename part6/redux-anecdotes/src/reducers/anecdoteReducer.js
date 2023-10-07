const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const voteAnecdote = (id) => {
  return {
    type: 'voteAnecdote',
    payload: {
      id
    }
  }
}

export const addAnectode = (content) => {
  return {
    type: 'addAnectode',
    payload: {
      content,
      votes:0,
      id:getId()
    }
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {

  switch(action.type){
    case 'voteAnecdote':
      return state.map(i => ( i.id===action.payload.id ) ? {...i,votes:i.votes+1} : i)
    case 'addAnectode':
      const data = action.payload;
      return state.concat({content:data.content,id:data.id,votes:data.votes})
    default:
      return state      
  }
}

export default anecdoteReducer