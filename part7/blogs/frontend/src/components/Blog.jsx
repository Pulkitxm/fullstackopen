import ToggleContent from "./ToggleContent";
import usersService from "../services/users";

const getAuthor = async (blog, blogs, setBlogs) => {
  if (blog.author.id) {
    return blog.author.name;
  } else {
    const author = await usersService.getUser(blog.author).then((author) => {
      setBlogs(
        blogs.map((b) =>
          b.id !== blog.id
            ? b
            : { ...b, author: { name: author.name, id: author.id } },
        ),
      );
      return author;
    });
    return author.name;
  }
};

const Blog = ({
  setBlogs,
  blog,
  blogs,
  i,
  user,
  SortedBlogs,
  setSortedBlogs,
  handleDelete,
}) => {
  return (
    <ToggleContent
      label="view"
      type="blog"
      blog={blog}
      i={i}
      author={getAuthor(blog, blogs, setBlogs)}
      user={user}
      SortedBlogs={SortedBlogs}
      setSortedBlogs={setSortedBlogs}
      handleDelete={handleDelete}
    />
  );
};

export default Blog;
