const dummy = (blogs) => {
  return 1;
};
const totalLikes = (blogs) => {
  let totLikes = 0;
  blogs.forEach((blog) => {
    totLikes += blog.likes;
    // console.log(blog.likes,totLikes);
  });
  return totLikes;
};

const favBlog = (blogs) => {
  return blogs.length === 0
    ? null
    : blogs.reduce((prevBlog, currentBlog) => {
        return currentBlog.likes > prevBlog.likes ? currentBlog : prevBlog;
      });
};

module.exports = {
  dummy,
  totalLikes,
  favBlog,
};
