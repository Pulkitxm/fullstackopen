import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ToggleContent from "./ToggleContent";
import { useDispatch } from "react-redux";
import blogServices from "../services/blogs";
import { useState } from "react";
import { getUser } from "../services/users";

const DisplayBlog = ({
  blogs,
  user,
  SortedBlogs,
  setSortedBlogs,
  handleDelete,
  i,
}) => {
  const id = useParams().id;
  const [comments, setcomments] = useState([])
  const [newComment, setnewComment] = useState('')
  useEffect(() => {
    (async () => {
      setcomments(await blogServices.getComments(id))
    })();
  }, []);

  const blog = blogs.filter((i) => i.id == id)[0];
  if (!blog) return <></>;

  const getAuthor = async (blog, blogs) => {
    const dispatch = useDispatch();
    if (blog.author.id) {
      return blog.author.name;
    } else {
      const author = await getUser(blog.author).then((author) => {
        const updatedBlogs = blogs.map((b) =>
          b.id !== blog.id
            ? b
            : { ...b, author: { name: author.name, id: author.id } }
        );
        dispatch({ type: "blogs/initializeBlogs", pyload: updatedBlogs });
        return author;
      });
      return author.name;
    }
  };
  return (
    <>
      <ToggleContent
        label="view"
        type="blog"
        blog={blog}
        author={getAuthor(blog, blogs)}
        user={user}
        SortedBlogs={SortedBlogs}
        setSortedBlogs={setSortedBlogs}
        handleDelete={handleDelete}
        visible={true}
      />
      <h2>Comments</h2>
      <div>
        <input type="text" value={newComment} onChange={e=>setnewComment(e.target.value)} />
        <button onClick={async()=>{
          blogServices.addComments(id,newComment)
          setcomments(comments.concat(newComment))
        }} >add comment</button>
      </div>
      <ul>
        {comments.map((comment) => (
          <li key={Math.floor(Math.random()*1000)} >{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default DisplayBlog;
