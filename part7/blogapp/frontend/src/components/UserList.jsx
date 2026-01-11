import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UserList = () => {
  const blogs = useSelector((state) => state.blogs)

  const usersToBlogs = () => {
    return blogs.reduce((acc, blog) => {
      const id = blog.user.id
      acc[id] = acc[id]
        ? { ...blog.user, blogCount: acc[id].blogCount + 1 }
        : { ...blog.user, blogCount: 1 }
      return acc
    }, {})
  }

  return (
    <div>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>user</th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(usersToBlogs()).map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>{user.blogCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
