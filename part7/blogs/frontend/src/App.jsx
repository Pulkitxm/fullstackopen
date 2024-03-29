import React, { useState, useEffect, useReducer } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Routes, Route, useNavigate, useParams } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Blog from "./components/Blog";
import DisplayBlog from "./components/DisplayBlog";
import LoginForm from "./components/LoginForm";
import BlogForm from "./components/BlogForm";
import ToggleContent from "./components/ToggleContent";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notification from "./components/Notification";
import { getUsers } from "./services/users";

import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const loginReducer = (state = null, action) => {
  switch (action.type) {
    case "setUser":
      return action.payload;
    default:
      return action.payload;
  }
};

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

import { Container } from "@mui/material";

const App = () => {
  const dispatch = useDispatch();
  let i = 0;
  const [open, setOpen] = useState(false);
  const blogs = useSelector((state) => state.blogs);
  const [username, setUsername] = useState("pulkit");
  const [password, setPassword] = useState("pulkit");
  const [title, setTitle] = useState("Pulkit's New Blog");
  const [author, setAuthor] = useState("652b964e73cb4a258a7cd2a1");
  const [url, setUrl] = useState("https://devpulkit.vercel.app/");
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");
  const [token, setToken] = useState("");
  const [SortedBlogs, setSortedBlogs] = useState([]);
  const navigate = useNavigate();
  const [user, userDispatch] = useReducer(loginReducer);
  const users = useSelector((state) => state.users);
  const notification = useSelector((state) => state.notification);
  useEffect(() => {
    blogService.getAll().then((blogs) => {
      //setBlogs(blogs);
      dispatch({ type: "blogs/initializeBlogs", payload: blogs });
      setSortedBlogs([]);
      setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes));
    });
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      userDispatch({ type: "set", payload: user });
      // setUser(user);
      setToken(`Bearer ${user.token}`);
    }
    (async () => {
      await getUsers().then((i) => {
        // setusers(i)
        dispatch({ type: "users/initialize", payload: i });
      });
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getUsers().then((i) => {
        // setusers(i)
        dispatch({ type: "users/initialize", payload: i });
      });
    })();
    setSortedBlogs([]);
    setSortedBlogs([...blogs].sort((a, b) => b.likes - a.likes));
  }, [blogs]);

  const setErrorMessage = (error) => console.log(error);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));
      setToken(`Bearer ${user.token}`);
      // setUser(user);
      userDispatch({ type: "set", payload: user });
      // console.log(user);
      // setUsername("");
      setPassword("");
      dispatch({
        type: "notification/changeNotification",
        payload: `${username} logged in`,
      });
      setOpen(true)
    } catch (exception) {
      setErrorMessage(exception);
    }
  };
  const logout = () => {
    if (window.localStorage.length) {
      window.localStorage.removeItem("loggedNoteappUser");
    }
    // navigate("/");
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
    dispatch({ type: "blogs/createBlog", payload: bog });
    setTitle("");
    setAuthor("");
    setUrl("");
    dispatch({
      type: "notification/changeNotification",
      payload: `New blog: '${bog.title}' added`,
    });
    setOpen(true)
  };
  const handleDelete = (blog) => {
    blogService.Delete(blog.id);
    if (window.confirm(`Remove ${blog.title} by ${blog.author.name}`)) {
      // setBlogs(blogs.filter((Blog) => Blog.id !== blog.id));
      dispatch({ type: "blogs/deleteBlog", payload: blog.id });
    }
  };
  const blogForm = () => {
    return (
      <>
        <h1>Blogs</h1>
        <p>
          {user.name} logged in <button onClick={logout}>logout</button>
        </p>
        <ToggleContent label="Add a new Note" type="form" setOpen={setOpen}>
          <BlogForm
            handleBogSubmit={handleBogSubmit}
            title={title}
            setTitle={setTitle}
            author={author}
            setAuthor={setAuthor}
            url={url}
            setUrl={setUrl}
            setOpen={setOpen}
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
            // // setUsername={setUsername}
            password={password}
            setOpen={setOpen}
          />
        </ToggleContent>
      </>
    );
  };
  const DisplayBlogs = () => {
    return (
      <>
        {user ? blogForm({ blogs }) : <></>}
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
                setOpen={setOpen}
              />
            );
          })
        ) : (
          <h3>Enter a Note to Start with the Application</h3>
        )}
      </>
    );
  };
  const DisplayUsers = () => {
    return (
      <>
        <h1>Users</h1>
        {user ? (
          <>
            {user.name} logged in <button onClick={logout}>logout</button>
          </>
        ) : (
          <></>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>blogs created</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </td>
                <td>{user.blogs.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    );
  };
  const DisplayUser = () => {
    const { id } = useParams();
    const [User, setUser] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          const userData = await getUsers(); // Assuming getUsers is an async function
          setUser(userData.find((u) => u.id === id));
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, []);
    return (
      <>
        <h1>Users</h1>
        {user ? (
          <>
            {user.name} logged in <button onClick={logout}>logout</button>
          </>
        ) : (
          <></>
        )}
        {User ? (
          <>
            <h2>{User.name}</h2>
            <h3>added blogs</h3>
            <ul>
              {User.blogs.map((blog) => {
                return <li key={blog.id}>{blog.title}</li>;
              })}
            </ul>
          </>
        ) : (
          <></>
        )}
      </>
    );
  };
  return (
    <Container>
      <Snackbar
        open={open}
        autoHideDuration={2000}
        onClose={(event, reason) => {
          if (reason === "clickaway") {
            return;
          }
          setOpen(false);
        }}
      >
        <Alert
          onClose={(event, reason) => {
            if (reason === "clickaway") {
              return;
            }
            setOpen(false);
          }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {notification}
        </Alert>
      </Snackbar>
      <Notification />
      <Navbar />
      {user ? <></> : loginForm()}
      <Routes>
        <Route path="/" element={<DisplayBlogs setOpen={setOpen} />} />
        <Route path="/users" element={<DisplayUsers setOpen={setOpen} />} />
        <Route path="/users/:id" element={<DisplayUser setOpen={setOpen} />} />
        <Route
          path="/blogs/:id"
          element={
            <DisplayBlog
              blogs={blogs}
              user={user}
              SortedBlogs={SortedBlogs}
              setSortedBlogs={setSortedBlogs}
              handleDelete={handleDelete}
              setOpen={setOpen}
              i={i}
            />
          }
        />
      </Routes>
    </Container>
  );
};

export default App;
