import Router from "express";
import Blog from "../models/blog.js";
import User from "../models/user.js";
import jwt from 'jsonwebtoken'
import { userExtractor } from "../utils/middleware.js";

const blogsRouter = Router()

blogsRouter.get('/',async (request, response) => {
  const res = await Blog.find({}).populate('user', { username: 1, name: 1 })
  response.status(200).json(res)
})

blogsRouter.post('/', userExtractor ,async (request, response) => {
  const body = request.body
  const user = request.user 

  if (!user) {
    return response.status(400).json({ error: 'UserId missing or not valid' })
  }

  if(!body.author || !body.title) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id
  })


  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog.toJSON())
})

blogsRouter.delete('/:id', userExtractor , async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if(!blog) {
    return response.status(404).json({ error: 'blog not found' })
  }

  if(blog.user.toString() !== user._id.toString()) {
    return response.status(401).json({ error: 'only the creator can delete a blog' })
  }

  await Blog.findByIdAndDelete(request.params.id)

  user.blogs = user.blogs.filter(b => b.toString() !== request.params.id.toString())
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const updatedBlog = await Blog.findByIdAndUpdate(
    request.params.id,
    request.body,
    { new: true, runValidators: true, context: 'query' }
  )
  response.status(200).json(updatedBlog)
})

export default blogsRouter