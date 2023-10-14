const listHelper_dummy = require("../utils/list_helper").dummy;
const listHelper_likes = require("../utils/list_helper").totalLikes;
const listHelper_fav = require("../utils/list_helper").favBlog;

const listWithmultipleBlogs = [
  {
    title: "Pulkit's  Peersonal Website",
    author: "Pulkit",
    url: "https://devpulkit.vercel.app/",
    likes: 1000000,
    id: "64c4a51b738fcb18586f765a",
  },
  {
    title: "Rbanshi's  Peersonal Website",
    author: "Rbanshi",
    url: "https://www.instagram.com/rbanshi_bhandari/",
    likes: 100000000,
    id: "64c54a78e3a284f6e44d9355",
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    id: "64c56ca1e3a284f6e44d9358",
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    id: "64c56ca9e3a284f6e44d935a",
  },
  {
    title: "First class tests",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    id: "64c56cb0e3a284f6e44d935c",
  },
  {
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    id: "64c56cb6e3a284f6e44d935e",
  },
  {
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    id: "64c56cbde3a284f6e44d9360",
  },
];

test("dummy returns one", () => {
  const blogs = [];

  const result = listHelper_dummy(blogs);
  expect(result).toBe(1);
});

describe("total likes", () => {
  const listWithOneBlog = [
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0,
    },
  ];

  test("when list has no blog, equals to zero", () => {
    const result = listHelper_likes([]);
    expect(result).toBe(0);
  });
  test("when list has only one blog, equals the likes of that", () => {
    const result = listHelper_likes(listWithOneBlog);
    expect(result).toBe(5);
  });
  test("of a bigger list, is calculated right", () => {
    let totLikes = 0;
    listWithmultipleBlogs.forEach((blog) => (totLikes += blog.likes));
    const result = listHelper_likes(listWithmultipleBlogs);
    expect(result).toBe(totLikes);
  });
});

describe("favourite blog", () => {
  maxlike = 0;
  listWithmultipleBlogs.forEach(
    (blog) => (maxlike = maxlike > blog.likes ? maxlike : blog.likes),
  );
  let favBlog = listWithmultipleBlogs[0];
  listWithmultipleBlogs.forEach(
    (blog) => (favBlog = blog.likes === maxlike ? blog : favBlog),
  );
  const result = listHelper_fav(listWithmultipleBlogs);

  test("favourite blog is ", () => {
    expect(result).toBe(favBlog);
  });
});
