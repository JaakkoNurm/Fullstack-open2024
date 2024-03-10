import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateForm from './CreateForm'

test('Test that form calls callback function with proper information after blog gets added', async () => {
    const mockCreateBlog = jest.fn()

    const { container } = render(
        <CreateForm createBlog={mockCreateBlog} />
    )

    const title = container.querySelector('#title')
    const author = container.querySelector('#author')
    const url = container.querySelector('#url')
    const createButton = container.querySelector('#create-button')

    const user = userEvent.setup()

    await user.type(title, 'title test')
    await user.type(author, 'author test')
    await user.type(url, 'url test')

    await user.click(createButton)

    expect(mockCreateBlog.mock.calls).toHaveLength(1)
    expect(mockCreateBlog.mock.calls[0][0].title).toBe('title test')
    expect(mockCreateBlog.mock.calls[0][0].author).toBe('author test')
    expect(mockCreateBlog.mock.calls[0][0].url).toBe('url test')
})