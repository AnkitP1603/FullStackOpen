import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { AppBar, Toolbar, Button } from '@mui/material'

const Navbar = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logoutUser())
    dispatch(notify(`Bye, ${user.name}!`))
  }

  return (
    <AppBar position="static">
      <Toolbar style={{ display: 'flex', justifyContent: 'space-between' }}>
        {user ? (
          <>
            <div>
              <Button color="inherit" component={Link} to="/">
                blogs
              </Button>
              <Button color="inherit" component={Link} to="/users">
                users
              </Button>
            </div>
            <div style={{ marginLeft: 5 }}>
              <em>{user.name} logged in</em>
              <Button
                color="inherit"
                onClick={handleLogout}
                style={{ marginLeft: 5 }}
              >
                logout
              </Button>
            </div>
          </>
        ) : (
          <div>Login</div>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
