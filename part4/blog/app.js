import express from 'express'
import mongoose from 'mongoose'
import { MONGODB_URL, PORT } from './utils/config.js'
import { info, error } from './utils/logger.js'
import blogsRouter from './controllers/blogs.js'
import {errorHandler, requestLogger, unknownEndpoint, tokenExtractor } from "./utils/middleware.js";
import usersRouter from './controllers/users.js'
import loginRouter from './controllers/login.js'

const app = express()

info('connecting to', MONGODB_URL)
mongoose.connect(MONGODB_URL, { family: 4 })
    .then(() => {
        info('connected to MongoDB')
    })
    .catch((err) => {
        error('error connection to MongoDB:', error.message)
    })

app.use(express.json())
app.use(tokenExtractor)
app.use(requestLogger)
app.use('/api/users',usersRouter)
app.use('/api/login',loginRouter)
app.use('/api/blogs',blogsRouter)
app.use(unknownEndpoint)
app.use(errorHandler)

export default app