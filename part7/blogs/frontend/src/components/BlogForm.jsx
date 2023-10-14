import React from "react";

const BlogForm = ({
  handleBogSubmit,
  title,
  author,
  url,
  setTitle,
  setAuthor,
  setUrl,
}) => {
  return (
    <form onSubmit={handleBogSubmit}>
      <div>
        title:
        <input
          type="text"
          value={title}
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          type="text"
          value={author}
          name="Username"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input
          type="text"
          value={url}
          name="Username"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;
