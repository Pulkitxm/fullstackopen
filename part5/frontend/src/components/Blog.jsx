const Blog = ({ blog }) => {
  // console.log(blog);
  return(
    <div>
      {blog.title} - {blog.author}
    </div>  
  )
}


export default Blog