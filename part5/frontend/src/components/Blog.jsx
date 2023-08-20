const Blog = ({ blog }) => {
  // console.log(blog);
  return(
    <div>
      {blog.title} - {blog.author.name}
    </div>  
  )
}


export default Blog