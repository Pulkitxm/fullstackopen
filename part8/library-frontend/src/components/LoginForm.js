import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../gqlQueries'

const LoginForm = ({ setError, setToken, show, setPage }) => {
  const [username, setUsername] = useState('pulkit')
  const [password, setPassword] = useState('secret')


  const [login, result] = useMutation(LOGIN, {
    onError: (error) => {
      setError(error.message)
    }
  })
  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('library-token', token)
    }
  }, [result.data])

  const submit = async (event) => {
    event.preventDefault()
    const resp = await login({ variables: { username, password } })
    setPage('authors')
  }
  if (!show) {
    return null
  }
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </div>
  )
}

export default LoginForm