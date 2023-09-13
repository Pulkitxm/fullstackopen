import React from 'react'
import '@testing-library/jest-dom'
import {screen,render} from '@testing-library/react'
import Blog from './Blog'

describe("<Blogs/>",()=>{

    test("blog renders content",()=>{
        const blog = {
            title: "Test Blog",
            author: "Author",
            url: "link_to_blog",
            likes: 0,
            id: "unique_id"
        };
        const {container} =  render(<Blog blog={blog} />)
        // screen.debug(container);
        expect(container).toHaveTextContent(blog.title)
        expect(container).not.toHaveTextContent(blog.author)
        expect(container).not.toHaveTextContent(blog.likes)
        expect(container).not.toHaveTextContent(blog.url)
    })

})