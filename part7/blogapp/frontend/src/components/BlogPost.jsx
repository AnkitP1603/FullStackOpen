import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import storage from '../services/storage'
import { notify } from '../reducers/notificationReducer'
import { likeBlog, removeBlog } from '../reducers/blogReducer'

const BlogPost = ({id}) => {
    const dispatch = useDispatch()
    const blogs = useSelector(state => state.blogs)
    const blog = blogs.find(b => b.id === id)

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

    return (
        <div>
            <h2>{blog.title} {blog.author}</h2>
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
            {canRemove && (
                <button onClick={() => handleDelete(blog)}>remove</button>
            )}
        </div>
    )
}

export default BlogPost