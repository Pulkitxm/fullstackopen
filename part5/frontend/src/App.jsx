import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('pulkit')
  const [password, setPassword] = useState('pulkit123') 
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const setErrorMessage = (error) => console.log(error)

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      console.log(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      // setErrorMessage('Wrong credentials')
      setErrorMessage(exception)
    }
  }
  const logout = () =>{
    console.log(window.localStorage);
    if (window.localStorage.length) {
      window.localStorage.removeItem('loggedNoteappUser')
    }
    window.location.reload();
  }

  const loginForm = () =>{
    return(
      <>
        <h1>log in to application</h1>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </>
    )
  }

  const blogForm = ({blogs}) =>{
    
    return (
        <>
          <h1>blogs</h1>
          <p>{user.name} logged in <button onClick={logout} >logout</button> </p>

        <form onSubmit={handleLogin}>
          <div>
            title
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>


          {
            blogs.map(blog =>
              <Blog key={blog.id} blog={blog} />
            )
          }
        </>
    )
  }
  return (
    <div>
      {user ? blogForm({ blogs }) : loginForm()}
    </div>
  )
}

export default App