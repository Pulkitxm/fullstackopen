import ToggleContent from './ToggleContent'

const Blog = ({ blog,i,user }) => {
  // console.log(blog);
  return(
    <ToggleContent label='view' type='blog' blog={blog} i={i} user={user} />
  )
}


export default Blog