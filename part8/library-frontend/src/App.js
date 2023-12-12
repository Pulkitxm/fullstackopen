import { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import FavBooks from './components/FavBooks'
const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('books')
  const [error, setError] = useState('')
  const client = useApolloClient()
  useEffect(() => {
    if (window.localStorage['library-token']) {
      setToken(window.localStorage['library-token'])
    }
  }, [])
  const logout = () => {
    setToken(null)
    window.localStorage.removeItem('library-token')
    client.resetStore()
  }
  const showError = (error) => {
    setError(error)
    setTimeout(() => {
      setError('')
    }, 5000)
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          !!token ?
            <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('fav')}>recommended</button>
              <button onClick={() => {
                logout()
                setPage('login')
              }}>logout</button>
            </>
            :
            <button onClick={() => setPage('login')}>login</button>
        }
      </div>
      <br />
      {
        error &&
        <div className="error" style={{
          color: 'red'
        }} >
          {error}
        </div>
      }

      <Authors showError={showError} show={page === 'authors'} />
      <Books showError={showError} show={page === 'books'} />
      <FavBooks showError={showError} show={page === 'fav'} />
      <NewBook show={page === 'add'} showError={showError} setPage={setPage} />
      <LoginForm show={page === 'login'} setToken={setToken} setError={setError} setPage={setPage} />
    </div>
  )
}

export default App
