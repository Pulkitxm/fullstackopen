import ToggleContent from './ToggleContent'
import usersService from '../services/users'


const getAuthor = async (blog) => {
  if (blog.author.id){
    return blog.author.name
  }else{
    const author = await usersService.getUser(blog.author).then(author => {
      return author
    })
    return author.name;
  }
}

const Blog = ({ blog,i,user }) => {
  return(
    <ToggleContent label='view' type='blog' blog={blog} i={i} author={getAuthor(blog)} />
  )
}


export default Blog