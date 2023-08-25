import ToggleContent from './ToggleContent'
import usersService from '../services/users'


const getAuthor = async (blog) => {
  // console.log(blog.author);
  if (blog.author.id){
    return blog.author.name
  }else{
    const author = await usersService.getUser(blog.author).then(author => {
      return author
    })
    return author.name;
  }
}

const Blog = ({ blog, i, user, SortedBlogs,setSortedBlogs }) => {
  return(
    <ToggleContent label='view' type='blog' blog={blog} i={i} author={getAuthor(blog)} user={user} SortedBlogs={SortedBlogs} setSortedBlogs={setSortedBlogs} />
  )
}


export default Blog