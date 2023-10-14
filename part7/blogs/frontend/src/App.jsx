import "./App.css";
import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import ToggleContent from "./components/ToggleContent";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from './components/Notification';

import {useSelector,useDispatch} from 'react-redux';

const App = () => {
  const dispatch = useDispatch()
  let i = 0;

  const notification = useSelector(state=>state.notification)
  const blogs = useSelector(state=>state.blogs)
  
  //const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('pulkit')
  const [password, setPassword] = useState('pulkit')
  const [title, setTitle] = useState("Pulkit's New Blog")
  const [author, setAuthor] = useState('652a43202d7bb78a572ca867')
  const [url, setUrl] = useState('https://devpulkit.vercel.app/')
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");
  const [user, setUser] = useState(null);
  const [token, setToken] = useState("");
  const [SortedBlogs, setSortedBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((blogs) => {
      //setBlogs(blogs);
      dispatch({type:"blogs/initializeBlogs",payload:blogs})
      setSortedBlogs([]);
      setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes));
    });
  }, []);
  useEffect(() => {
    setSortedBlogs([]);
    setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes));
  }, [blogs]);
  // useEffect(() => {
  //   console.log("SortedBlogs", SortedBlogs);
  // }, [SortedBlogs])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      setToken(`Bearer ${user.token}`);
    }
  }, []);

  const setErrorMessage = (error) => console.log(error);

  const handleLogin = async (event) => {
    event.preventDefault();
    dispatch({type:"notification/changeNotification",payload:`${username} logged in`})
    setTimeout(()=>{
      dispatch({type:"notification/changeNotification",payload:``})
    },5000)
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setToken(`Bearer ${user.token}`);
      setUser(user);
      // console.log(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage(exception);
    }
  };
  const logout = () => {
    if (window.localStorage.length) {
      window.localStorage.removeItem("loggedNoteappUser");
    }
    window.location.reload();
  };
  const handleBogSubmit = async (e) => {
    e.preventDefault();

    const newObject = {
      title,
      author,
      url,
      likes: 0,
    };
    const bog = await blogService.create({
      newObject: newObject,
      token: token,
    });
    // setBlogs(blogs.concat(bog));
    dispatch({type:"blogs/createBlog",payload:bog})
    setTitle("");
    setAuthor("");
    setUrl("");
  };
  const handleDelete = (blog) => {
    blogService.Delete(blog.id);
    if (window.confirm(`Remove ${blog.title} by ${blog.author.name}`)) {
      // setBlogs(blogs.filter((Blog) => Blog.id !== blog.id));
      dispatch({type:"blogs/deleteBlog",payload:blog.id})
    }
  };
  const blogForm = () => {
    return (
      <>
        <h1>blogs</h1>
        <p>
          {user.name} logged in <button onClick={logout}>logout</button>
        </p>
        <ToggleContent label="Add a new Note" type="form">
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
    );
  };
  const loginForm = () => {
    return (
      <>
        <h1>log in to application</h1>
        <ToggleContent label="Login" type="form">
          <LoginForm
            handleLogin={handleLogin}
            username={username}
            setPassword={setPassword}
            setUsername={setUsername}
            password={password}
          />
        </ToggleContent>
      </>
    );
  }
  return (
    <div>
      <Notification/>
      {user ? blogForm({ blogs }) : loginForm()}
      {JSON.stringify(SortedBlogs) != JSON.stringify([]) ? (
        SortedBlogs.map((blog) => {
          i += 1;
          return (
            <Blog
              blogs={blogs}
              // setBlogs={setBlogs}
              key={blog.id}
              blog={blog}
              i={i}
              user={user}
              SortedBlogs={SortedBlogs}
              setSortedBlogs={setSortedBlogs}
              handleDelete={handleDelete}
            />
          );
        })
      ) : (
        <h3>Enter a Note to Start with the Application</h3>
      )}
    </div>
  );
};

export default App;
