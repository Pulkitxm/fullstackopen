import React, { useState, useEffect } from "react";
import blogService from "../services/blogs";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import img from "../assets/open in new tab.png";

const ToggleContent = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(props.visible ? true : false);
  const [author, setAuthor] = useState("");
  // if() setVisible(props.visible)
  if (props.type === "form") {
    return (
      <div>
        {visible ? props.children : <></>}
        <br />
        <br />
        <button
          onClick={() => {
            setVisible(!visible);
            dispatch({
              type: "notification/changeNotification",
              payload: `add blog is toggled`,
            });
            setTimeout(() => {
              dispatch({
                type: "notification/changeNotification",
                payload: ``,
              });
            }, 5000);
          }}
          style={{ backgroundColor: "red" }}
        >
          {visible ? "Cancel" : props.label}
        </button>
      </div>
    );
  } else if (props.type === "blog") {
    const [like, setLike] = useState(props.blog.likes);
    const handleLike = () => {
      const b = props.blog;
      dispatch({ type: "blogs/addLike", payload: b.id });
      setLike(like + 1);
      blogService.update(b.id, {
        ...b,
        author: b.author.id,
        likes: b.likes + 1,
      });
      dispatch({
        type: "notification/changeNotification",
        payload: `blog: '${b.title}' is liked`,
      });
      setTimeout(() => {
        dispatch({ type: "notification/changeNotification", payload: `` });
      }, 5000);
      // if (props.user) {
      //   setLike(like + 1);
      //   props.blog.likes += 1;
      //   let id = props.blog.id;
      //   let newObject1 = { ...props.blog, author: author.id, likes: like + 1 };
      //   let newObject2 = { ...props.blog, likes: like + 1 };
      //   blogService.update(id, newObject1);
      //   let UpdatedBogs = [
      //     ...props.SortedBlogs.filter((blog) => blog.id !== id),
      //     newObject2,
      //   ];
      //   UpdatedBogs = [...UpdatedBogs].sort((a, b) => b.likes - a.likes);
      //   props.setSortedBlogs([]);
      //   props.setSortedBlogs(UpdatedBogs);
      // }
    };

    useEffect(() => {
      props.author.then((Author) => {
        setAuthor(Author);
      });
    }, [props.author, props.type]);
    return (
      <div className="note">
        {props.i ? (
          <>
            {props.i} {") "}
          </>
        ) : (
          <></>
        )}
        title: <b>{props.blog.title}</b>
        &nbsp;
        {props.i && props.i!=0? (
          <button
            onClick={() => {
              navigate(`/blogs/${props.blog.id}`);
            }}
            className="visible"
          >
            {visible ? "hide" : props.label}
          </button>
        ) : (
          <></>
        )}
        &nbsp;
        <button
          onClick={() => {
            props.handleDelete(props.blog);
            dispatch({
              type: "notification/changeNotification",
              payload: `blog: '${props.blog.title}' is deleted`,
            });
            setTimeout(() => {
              dispatch({
                type: "notification/changeNotification",
                payload: ``,
              });
            }, 5000);
          }}
        >
          Delete
        </button>
        {visible ? (
          <>
            <br />
            url: <a href={props.blog.url} target="_blank" >{props.blog.url}</a>
            <br />
            <p
              style={{
                display: "inline",
                cursor: "pointer",
                userSelect: "none",
              }}
              onClick={handleLike}
            >
              👍
            </p>
            : {like}
            <br />
            author: {author}
          </>
        ) : (
          <></>
        )}
      </div>
    );
  }
};

export default ToggleContent;
