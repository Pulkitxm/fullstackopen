import { useSelector, useDispatch } from 'react-redux'
import reducer,{voteAnecdote,addAnectode} from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  const newAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAnectode(event.target.content.value))
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={e=>newAnecdote(e)} >
        <div><input name='content' /></div>
        <button>create</button>
      </form>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App