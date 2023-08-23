const Blog = ({ blog,i }) => {
  // console.log(blog);
  return(
    <div>
      <br/>
      {i}{') '}title: <b>{blog.title}</b> 
      <br/>
      likes:{' '+blog.likes}
      <br/>
      url: <a href={blog.url}>{blog.url}</a>
    </div>  
  )
}


export default Blog