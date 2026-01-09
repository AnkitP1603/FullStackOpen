import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
    name: 'blogs',
    initialState: [],
    reducers: {
        setBlogs(state, action){
            return action.payload
        },
        createBlog(state, action){
            state.push(action.payload)
        },
        updateBlog(state, action){
            const updatedBlog = action.payload
            return state.map(blog => 
                blog.id !== updatedBlog.id ? blog : updatedBlog
            )
        },
        deleteBlog(state, action){
            const id = action.payload
            return state.filter(blog => blog.id !== id)
        }
    }
})

const { setBlogs, createBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch(setBlogs(blogs))
    }
}

export const appendBlog = (blog) => {
    return async dispatch => {
        const newBlog = await blogService.create(blog)
        dispatch(createBlog(newBlog))
    }
}

export const likeBlog = (blog) => {
    return async dispatch => {
        const updatedBlog = await blogService.update(blog.id, {
            ...blog,
            likes: blog.likes + 1,
        })
        dispatch(updateBlog(updatedBlog))
    }
}

export const removeBlog = (blog) => {
    return async dispatch => {
        await blogService.remove(blog.id)
        dispatch(deleteBlog(blog.id))
    }
}

export default blogSlice.reducer