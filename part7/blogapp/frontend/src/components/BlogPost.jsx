import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import storage from '../services/storage'
import { notify } from '../reducers/notificationReducer'
import { likeBlog, removeBlog, commentBlog } from '../reducers/blogReducer'

const BlogPost = ({ id }) => {
  const dispatch = useDispatch()
  const [comment, setComment] = useState('')
  const blogs = useSelector((state) => state.blogs)
  const blog = blogs.find((b) => b.id === id)

  if (!blog) {
    return null
  }

  const nameOfUser = blog.user ? blog.user.name : 'anonymous'

  const canRemove = blog.user ? blog.user.username === storage.me() : true

  console.log(blog.user, storage.me(), canRemove)

  const handleVote = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notify(`You liked '${blog.title}' by ${blog.author}`))
  }

  const handleDelete = (blog) => {
    if (window.confirm(`Remove blog '${blog.title}' by ${blog.author}'?`)) {
      dispatch(removeBlog(blog))
      dispatch(notify(`Blog '${blog.title}' by ${blog.author} removed`))
    }
  }

  const handleComment = (event) => {
    event.preventDefault()
    dispatch(commentBlog(blog.id, comment))
    dispatch(notify(`Comment added to '${blog.title}'`))
    setComment('')
  }

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <div>
        <a href={blog.url}>{blog.url}</a>
      </div>
      <div>
        {blog.likes} likes
        <button style={{ marginLeft: 3 }} onClick={() => handleVote(blog)}>
          like
        </button>
      </div>
      <div>added by {nameOfUser}</div>
      {canRemove && <button onClick={() => handleDelete(blog)}>remove</button>}

      <h3>comments</h3>

      <form onSubmit={handleComment}>
        <input
          type="text"
          placeholder="awesome article!"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit">add comment</button>
      </form>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>
    </div>
  )
}

export default BlogPost
