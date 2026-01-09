import { useState, useEffect, createRef } from 'react'

import Login from '../components/Login'
import Blog from '../components/Blog'
import NewBlog from '../components/NewBlog'
import Notification from '../components/Notification'
import Togglable from '../components/Togglable'
import { notify } from '../reducers/notificationReducer'
import { initializeBlogs } from '../reducers/blogReducer'
import { initializeUser, logoutUser } from '../reducers/userReducer'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
    const blogs = useSelector(state => state.blogs)
    const blogFormRef = createRef()  

    return (
        <div>
            <Togglable buttonLabel="create new" ref={blogFormRef}>
                <NewBlog blogFormRef={blogFormRef}/>
            </Togglable>
            {[...blogs].sort((a,b)=>b.likes-a.likes).map((blog) => (
                <Blog
                key={blog.id}
                blog={blog}
                />
            ))}
        </div>
    )
}

export default Home