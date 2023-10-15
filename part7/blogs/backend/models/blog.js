const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: String,
  // author:String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  url: String,
  likes: Number,
  comments: Array,
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
