import { useState } from 'react'
import PropTypes from 'prop-types'

const CreateForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleTitleChange = (event) => {
        setTitle(event.target.value)
    }
    const handleAuthorChange = (event) => {
        setAuthor(event.target.value)
    }
    const handleUrl = (event) => {
        setUrl(event.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        createBlog({
            title: title,
            author: author,
            url: url,
        })
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    title:
                    <input
                        type="text"
                        value={title}
                        name="Title"
                        onChange={handleTitleChange}
                        placeholder="enter title"
                        id="title"
                    />
                </div>
                <div>
                    author:
                    <input
                        type="text"
                        value={author}
                        name="Author"
                        onChange={handleAuthorChange}
                        placeholder="enter author"
                        id="author"
                    />
                </div>
                <div>
                    url:
                    <input
                        type="text"
                        value={url}
                        name="Url"
                        onChange={handleUrl}
                        placeholder="enter url"
                        id="url"
                    />
                </div>
                <button type="submit" id='create-button'>create</button>
            </form>
        </div>
    )
}

CreateForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}


export default CreateForm