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
})

test('id is defined for each blog', async () => {
    const blogs = await api.get('/api/blogs')
    blogs.body.forEach(blog => {
        // console.log(blog);
        expect(blog.likes).toBeDefined();
    });
})

afterAll(async () => {
    await mongoose.connection.close()
})