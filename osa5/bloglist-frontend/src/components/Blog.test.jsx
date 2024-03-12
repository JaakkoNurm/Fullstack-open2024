import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders blog title and author', () => {
    const blog = {
        title: 'Test title',
        author: 'Test author',
        url: 'test-blog.com',
        user: 'Test User',
        likes: 4
    }
    const user = {
        name: 'test',
        username: 'test'
    }

    const addLikes = () => null
    const deleteBlog = () => null

    const { container } = render(
        <Blog
            blog={blog}
            user={user}
            addLikes={addLikes}
            deleteBlog={deleteBlog}
        />
    )

    expect(container).toHaveTextContent(
        'Test title'
    )
    expect(container).toHaveTextContent(
        'Test author'
    )
})

test('Event handler calls equal to times button is pressed', async () => {
    const blog = {
        title: 'Test title',
        author: 'Test author',
        url: 'test-blog.com',
        user: 'Test User',
        likes: 4
    }
    const user = {
        name: 'test',
        username: 'test'
    }
    const deleteBlog = () => null

    const mockLikeHandler = jest.fn()

    const { container } = render(
        <Blog
            blog={blog}
            user={user}
            addLikes={mockLikeHandler}
            deleteBlog={deleteBlog}
        />
    )

    const event = userEvent.setup()
    const button = screen.getByText('like')
    await event.click(button)
    await event.click(button)

    expect(mockLikeHandler.mock.calls).toHaveLength(2)
})