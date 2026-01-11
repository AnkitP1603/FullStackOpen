import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { appendBlog } from '../reducers/blogReducer'
import { Form, Button } from 'react-bootstrap'

const NewBlog = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [author, setAuthor] = useState('')
  const dispatch = useDispatch()

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }

  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    doCreate({ title, url, author })
    setAuthor('')
    setTitle('')
    setUrl('')
  }

  const doCreate = async (blog) => {
    dispatch(appendBlog(blog))
    dispatch(notify(`Blog created: ${blog.title}, ${blog.author}`))
    blogFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h3>Create a New Blog</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Title:</Form.Label>
          <Form.Control
            type="text"
            data-testid="title"
            value={title}
            onChange={handleTitleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>URL:</Form.Label>
          <Form.Control
            type="text"
            data-testid="url"
            value={url}
            onChange={handleUrlChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Author:</Form.Label>
          <Form.Control
            type="text"
            data-testid="author"
            value={author}
            onChange={handleAuthorChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Create
        </Button>
      </Form>
    </div>
  )
}

export default NewBlog
