import React from 'react'
import { useSelector } from 'react-redux'

const User = ({id}) => {
    const blogs = useSelector(state => state.blogs)
    
    const userBlogs = blogs.filter(blog => blog.user.id === id)

    const user = userBlogs.length > 0 ? userBlogs[0].user : null

    if (!user) {
        return null
    }

    return (
        <div>
            <h2>{user.name}</h2>
            <p>added blogs</p>
            <ul>
                {userBlogs.map(blog => (
                    <li key={blog.id}>{blog.title}</li>
                ))}
            </ul>
        </div>
    )
}

export default User