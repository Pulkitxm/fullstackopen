import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {fetchAll} from './services/request'
import {addVote} from './services/request'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'

const App = () => {
  const queryClient = useQueryClient()
  const addVoteMutation = useMutation(addVote, {
    onSuccess: function () {
      queryClient.invalidateQueries('anecdotes');
    },
  });
  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: ()=>fetchAll(),
    retry:1
  })
  // console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }
  if ( result.isError ) {
    return <div>
      anecdote service not avialable due to problem in server
    </div>
  }

  const anecdotes = result.data
  // console.log('anecdotes', anecdotes)
  
  const handleVote = (anecdote) => {
    addVoteMutation.mutate({...anecdote,votes:anecdote.votes+1})
  }

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <hr />
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
          <br />
        </div>
      )}
    </div>
  )
}

export default App
