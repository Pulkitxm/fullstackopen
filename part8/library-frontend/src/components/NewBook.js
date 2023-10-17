import { useMutation } from '@apollo/client'
import { useState } from 'react'

import {CREATE_BOOK,fetchAuthors,fetchBooks} from '../gqlQueries'

const NewBook = (props) => {
  // const [title, setTitle] = useState('')
  // const [author, setAuthor] = useState('')
  // const [published, setPublished] = useState('')
  // const [genre, setGenre] = useState('')
  // const [genres, setGenres] = useState([])
  const [title, setTitle] = useState('Pimeyden tango')
  const [author, setAuthor] = useState('Reijo Maki')
  const [published, setPublished] = useState(1997)
  const [genre, setGenre] = useState('crappy')
  const [genres, setGenres] = useState([''])

  const [ createBook ] = useMutation((CREATE_BOOK), {
    refetchQueries: [ { query: fetchAuthors }, { query: fetchBooks } ]
  })
  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const res = createBook({  variables: {title,author,published,genres} })

    props.setPage("books")
    
    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook