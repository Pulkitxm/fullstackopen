import './App.css'
import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import ToggleContent from './components/ToggleContent'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  let i = 0;
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('') 
  const [title, setTitle] = useState("") 
  const [author, setAuthor] = useState('') 
  const [url, setUrl] = useState('') 
  const [user, setUser] = useState(null)
  const [token, setToken] = useState('')

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
      setToken(`Bearer ${user.token}`)
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
      setToken(`Bearer ${user.token}`)
      setUser(user)
      // console.log(user);
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage(exception)
    }
  }
  const logout = () =>{
    if (window.localStorage.length) {
      window.localStorage.removeItem('loggedNoteappUser')
    }
    window.location.reload();
  }
  const handleBogSubmit = async (e) =>{
    e.preventDefault();

    const newObject = {
      title, author, url, likes: 10
    }
    const bog = await blogService.create(
      { newObject: newObject , token: token})
    setBlogs(blogs.concat(bog));
    setTitle("");
    setAuthor("");
    setUrl("");
  } 
  const blogForm = () =>{
    return(
      <>
        <h1>blogs</h1>
        <p>{user.name} logged in <button onClick={logout}>logout</button></p>
        <ToggleContent label='Add a new Note' type='form' >
          <BlogForm
            handleBogSubmit={handleBogSubmit}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
          />
        </ToggleContent>
      </>
    )
  }
  const loginForm = () =>{
    return(
      <>
        <h1>log in to application</h1>
        <ToggleContent label='Login' type='form' >
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setPassword={setPassword}
            setUsername={setUsername}
            password={password}
          />
        </ToggleContent>
      </>
    )
  }
  return (
    <div>
      {user ? blogForm({ blogs }) : loginForm()}
      {
        blogs.map(blog =>{
          i+=1;
          return <Blog key={blog.id} blog={blog} i={i} user={user} />
        }
        )
      }
    </div>
  )
}

export default App