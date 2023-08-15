const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')

const api = supertest(app)

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
},100000)

test('id is defined for each blog', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.forEach(blog => {
        
        expect(blog.likes).toBeDefined();
    });
}, 100000)

test('new blog is added correctly', async () => {
    let blogs = await api.get('/api/blogs');
    const length1 = blogs.body.length;
    
    const newBlog = {
        title: "A New Test blog",
        author: "Pulkit1",
        url: "https://devpulkit.vercel.app/",
        likes: 1000000
    };
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(200);
    
    blogs = await api.get('/api/blogs');
    const length2 = blogs.body.length;
    expect(length2).toBe(length1+1);
    
    await api
        .delete(`/api/blogs/${blogs.body[blogs.body.length - 1].id}`)
        .expect(200) 
}, 100000)

afterAll(async () => {
    await mongoose.connection.close()
})