import React from 'react'
import '@testing-library/jest-dom'
import {screen,render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
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

    // test("blog renders likes,author and url after button click",async ()=>{
    //     const blog = {
    //         title: "Test Blog",
    //         author: "64ff5c5f30c256a7c7c67827",
    //         url: "link_to_blog",
    //         likes: 0,
    //         id: "unique_id"
    //     };

    //     const mockHandler = jest.fn();

    //     const {container} =  render(<Blog blog={blog} handleDelete={mockHandler}  />);
    //     const user = userEvent.setup();
    //     const button = screen.getByText("Delete");
    //     await user.click(button);
    //     expect(container).toHaveTextContent("Pulkit")
    //     expect(container).toHaveTextContent(blog.likes)
    //     expect(container).toHaveTextContent(blog.url)
    // })

    test("likes calls increased by 2",async ()=>{
        const blog = {
            title: "Test Blog",
            author: "64ff5c5f30c256a7c7c67827",
            url: "link_to_blog",
            likes: 0,
            id: "unique_id"
        };

        const mockHandler = jest.fn();

        const {container} =  render(<Blog blog={blog} handleDelete={mockHandler} handleLike={mockHandler}  />);
        const user = userEvent.setup();
        const button = screen.getByText("Delete");
        await user.click(button);
        await user.click(button);
        expect(mockHandler.mock.calls).toHaveLength(2);
    })

})