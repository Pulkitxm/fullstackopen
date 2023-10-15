import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ToggleContent from "./ToggleContent";
import { useDispatch } from "react-redux";
import blogServices from "../services/blogs";
import { useState } from "react";

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
      <ul>
        {comments.map((comment) => (
          <li key={Math.floor(Math.random()*1000)} >{comment}</li>
        ))}
      </ul>
    </>
  );
};

export default DisplayBlog;
