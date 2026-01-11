import React, { useState } from 'react'
import PropTypes from 'prop-types'
import storage from '../services/storage'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => {
  return (
    <div className="blog">
      <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    likes: PropTypes.number.isRequired,
    user: PropTypes.object,
    comment: PropTypes.array,
  }).isRequired,
  // handleVote: PropTypes.func.isRequired,
  // handleDelete: PropTypes.func.isRequired,
}

export default Blog
