const testingRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

testingRouter.get("/reset", async (request, response) => {
  response.send("working");
});

testingRouter.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  response.status(204).end();
});

module.exports = testingRouter;
