import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import CreateForm from './components/CreateForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [notification, setNotification] = useState(null)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => b.likes - a.likes)
            setBlogs(blogs)
        })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()

        try {
            const user = await loginService.login({
                username, password
            })

            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )

            blogService.setToken(user.token)
            setUser(user)
            setUsername('')
            setPassword('')
        } catch (exception) {
            setErrorMessage({
                text: 'wrong username or password',
                type: 'error'
            })
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const LogoutButton = () => {
        const handleLogout = () => {
            window.localStorage.removeItem('loggedBlogappUser')
            setUser(null)
        }

        return (<div className='container'>
            <p>{user.name} logged in</p>
            <button onClick={handleLogout}> logout </button>
        </div>)
    }

    const addBlog = (blogObject) => {
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setNotification({
                    text: `a new blog "${blogObject.title}" by ${blogObject.author} added`,
                    type: 'notification'
                })
                setTimeout(() => {
                    setNotification(null)
                }, 5000)
            })
    }

    const addLikes = async (id, blogObject) => {
        const likedBlog = await blogService.update(id, blogObject)
        /* Voisiko uudelleen renderöinnin tehdä jotenkin hienovaraisemmin?

        setBlogs(
        blogs.map(blog =>
            blog.id === likedBlog.id
            ? { ...blog, likes: likedBlog.likes }
            : blog
        )
        )*/
        window.location.reload()
    }

    const deleteBlog = async (id) => {
        const deletedBlog = blogs.find(blog =>
            blog.id === id)
        const confirmDelete = window.confirm(`Remove blog ${deletedBlog.title} by ${deleteBlog.author}`)
        if (confirmDelete && user.username === deletedBlog.user.username) {
            await blogService.deleteBlog(id)
            setBlogs(
                blogs.filter(blog =>
                    blog.id !== deletedBlog.id
                )
            )
            setNotification({
                text: `blog by author ${deleteBlog.author} deleted`,
                type: 'notification'
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        } else {
            setNotification({
                text: 'You are not authorized to delete this blog',
                type: 'error'
            })
            setTimeout(() => {
                setNotification(null)
            }, 5000)
        }
    }

    if (user === null) {
        return (
            <LoginForm
                handleLogin={handleLogin}
                setUsername={setUsername}
                setPassword={setPassword}
                username={username}
                password={password}
                errorMessage={errorMessage}
            />
        )
    }

    return (
        <div>
            <h2>Blogs</h2>
            <Notification message={notification}/>
            <div>
                <LogoutButton/>
                <Togglable>
                    <CreateForm createBlog={addBlog}/>
                </Togglable>
                {blogs.map(blog =>
                    <Blog key={blog.id}
                        blog={blog}
                        addLikes={addLikes}
                        deleteBlog={deleteBlog}
                        user={user} />
                )}
            </div>
        </div>
    )
}

export default App