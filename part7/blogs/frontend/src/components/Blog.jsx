import ToggleContent from "./ToggleContent";
import {getUser} from "../services/users";

import { useDispatch } from "react-redux";

const getAuthor = async (blog, blogs) => {
  const dispatch = useDispatch() 
  if (blog.author.id) {
    return blog.author.name;
  } else {
    const author = await getUser(blog.author).then((author) => {
      const updatedBlogs = blogs.map((b) =>
          b.id !== blog.id
            ? b
            : { ...b, author: { name: author.name, id: author.id } },
        )
      dispatch({type:"blogs/initializeBlogs",pyload:updatedBlogs})
      return author;
    });
    return author.name;
  }
};

const Blog = ({
  blog,
  blogs,
  i,
  user,
  SortedBlogs,
  setSortedBlogs,
  handleDelete,
  setOpen
}) => {
  return (
    <ToggleContent
      label="view"
      type="blog"
      blog={blog}
      i={i}
      author={getAuthor(blog, blogs)}
      user={user}
      SortedBlogs={SortedBlogs}
      setSortedBlogs={setSortedBlogs}
      handleDelete={handleDelete}
      setOpen={setOpen}
    />
  );
};

export default Blog;
