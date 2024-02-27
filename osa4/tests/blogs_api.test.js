const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')


const initialBlogs = [
    {
        title: 'Coding with coffee',
        author: 'John Smith',
        url: 'https://codingwithcoffee.com',
        likes: 42
    },
    {
        title: 'The Node Nerd',
        author: 'Alice Lee',
        url: 'https://thenodenerd.com',
        likes: 35
    },
    {
        title: 'Express yourself',
        author: 'Bob Jones',
        url: 'https://expressyourself.com',
        likes: 28
    },
]
describe('when there is initially some blogs saved', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(initialBlogs)
    })
    
    test('blogs are returned as json', async() => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('there are three blogs', async() => {
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, 3)
    })
    /*
    test('blogs can be added', async() => {
        const blogObject = new Blog({
            title: 'Lazy Brogrammer',
            author: 'Joni Mäkipelto',
            url: 'https://lazyprogrammer.com',
            likes: 9
        })
        await blogObject.save()
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, initialBlogs.length + 1)
    })
    */
    const newBlog = {
        title: 'Lazy Brogrammer',
        author: 'Joni Mäkipelto',
        url: 'https://lazyprogrammer.com',
        likes: 9
    }
    
    test('a blog can be added with a POST request', async () => {
        const blogsBefore = await Blog.countDocuments()
    
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogsAfter = await Blog.countDocuments()
        assert.strictEqual(blogsAfter, blogsBefore + 1)
    })
    
    test('a blog can be deleted by id', async () => {
        let blogs = await Blog.find({})
        const blogsBefore = blogs.map(blog => blog.toJSON())
        const blogToDelete = blogs[0]
    
        await api
            .delete(`/api/blogs/${blogToDelete.id}`) 
            .expect(204)
        
        blogs = await Blog.find({})
        const blogsAfter = blogs.map(blog => blog.toJSON())
        assert.strictEqual(blogsBefore.length - 1, blogsAfter.length)
    
        const ids = blogsAfter.map(blog => blog.id)
        expect(ids).not.toContain(blogToDelete.id)
    })
    
    test('a blog can be updated', async () => {
        const blogToUpdate = await Blog.findOne()
        const changedBlog = {
            title: "Updated title",
            author: "Updated author",
            url: "Updated url",
            likes: blogToUpdate.likes + 3
        }
    
        const response = await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(changedBlog)
            
        expect(response.status).toBe(200)
        expect(response.body).toMatchObject(changedBlog)
    })
})


describe('when there is initially one user at db', () => {
    beforeEach(async () => {
        await User.deleteMany({})

        const passwordHash = await bcrypt.hash('secret', 10)
        const user = new User({ username: 'root', passwordHash })

        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const users = await User.find({})
        const usersAtStart = users.map(u => u.toJSON())

        const newUser = {
            username: 'jaajnu',
            name: 'Jaakko Nurminen',
            password: 'salasana',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAfter = await User.find()
        const usersAtEnd = usersAfter.map(u => u.toJSON())
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const users = await User.find({})
        const usersAtStart = users.map(u => u.toJSON())

        const newUser = {
            username: 'root',
            name: 'Superuser',
            password: 'salasana',
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)

        expect(result.body.error).toContain('expected `username` to be unique')

        const usersAfter = await User.find({})
        const usersAtEnd = usersAfter.map(m => m.toJSON())
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})