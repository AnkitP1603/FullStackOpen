import Home from './pages/Home'
import Notification from './components/Notification'
import Navbar from './components/Navbar'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import Login from './components/Login'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUser } from './reducers/userReducer'
import { Route, Routes, Link, useMatch } from 'react-router-dom'
import UserList from './components/UserList'
import User from './components/User'
import BlogPost from './components/BlogPost'

const App = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const userMatch = useMatch('/users/:id')
  const blogMatch = useMatch('/blogs/:id')

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  useEffect(() => {
    dispatch(initializeUser())
  }, [])

  return (
    <div className="container">
      {!user ? (
        <div>
          <Navbar />
          <Notification />
          <Login />
        </div>
      ) : (
        <div>
          <Navbar />
          <h2>blogs</h2>
          <Notification />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blogs" element={<Home />} />
            <Route path="/users" element={<UserList />} />
            <Route
              path="/users/:id"
              element={<User id={userMatch ? userMatch.params.id : null} />}
            />
            <Route
              path="/blogs/:id"
              element={<BlogPost id={blogMatch ? blogMatch.params.id : null} />}
            />
          </Routes>
        </div>
      )}
    </div>
  )
}

export default App
