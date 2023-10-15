import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAnecdote } from '../services/request';

const AnecdoteForm = () => {
  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation(createAnecdote, {
    onSuccess: function () {
      queryClient.invalidateQueries('anecdotes');
    },
  });

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if (content.length <5) return alert("too short anecdote")
    newAnecdoteMutation.mutate({ content, votes:0 })
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
