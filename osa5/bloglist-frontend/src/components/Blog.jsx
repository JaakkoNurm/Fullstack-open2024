import PropTypes from 'prop-types'

const Blog = ({
    blog,
    addLikes,
    deleteBlog,
    user
}) => {
    const handleLikes = () => {
        const blogObject = {
            ...blog,
            likes: blog.likes + 1
        }

        addLikes(blog.id, blogObject)
    }

    const handleDelete = () => {
        deleteBlog(blog.id)
    }

    return (
        <div>
            {blog.title} {blog.author}
            <div>
                {blog.likes}
                <button onClick={handleLikes}>like</button>
                {user && user.username === blog.user.username
            && <button onClick={handleDelete}>delete</button>}
            </div>
        </div>
    )
}

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    addLikes: PropTypes.func.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired
}

export default Blog