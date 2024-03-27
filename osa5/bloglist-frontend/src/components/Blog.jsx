import PropTypes from 'prop-types'

const Blog = ({
    blog,
    addLikes,
    deleteBlog,
    user
}) => {
    const handleLikes = async () => {
        const blogObject = {
            ...blog,
            likes: (blog.likes !== undefined) ? blog.likes + 1 : 1
        }

        addLikes(blog.id, blogObject)
    }

    const handleDelete = () => {
        deleteBlog(blog.id)
    }

    return (
        <div className='blog'>
            <h2 className='blog-title'>{blog.title}</h2>
            <h3 className='blog-author'>{blog.author}</h3>
            <div className='blog-likes'>
                Likes: {blog.likes}
            </div>
            <div>
                <button className='like-button' onClick={handleLikes}>like</button>
                {user && user.username === blog.user.username
            && <button className='delete-button' onClick={handleDelete}>delete</button>}
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