import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  const [page, setPage] = useState('authors')
  const [error, setError] = useState('')
  const showError = (error) => {
    setError(error)
    setTimeout(() => {
      setError('')
    },5000)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>
      <br />
      {
        error &&
        <div className="error" style={{
            color:'red'
        }} >
            {error}
        </div>
      }

      <Authors showError={showError} show={page === 'authors'} />

      <Books showError={showError} show={page === 'books'} />

      <NewBook show={page === 'add'} showError={showError} setPage={setPage} />
    </div>
  )
}

export default App
