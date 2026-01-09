import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const dispatch = useDispatch()

  const handleLogin = (event) => {
    event.preventDefault()
    doLogin({ username, password })
    setUsername('')
    setPassword('')
  }

  const doLogin = async (credentials) => {
    try {
      const response = await dispatch(loginUser(credentials))
      dispatch(notify(`Welcome back, ${response.name}`))
    } catch (error) {
      console.log('login error', error)
      dispatch(notify('Wrong credentials', 'error'))
    }
  }

  return (
    <form onSubmit={handleLogin}>
      <label>
        Username:
        <input
          type="text"
          data-testid="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Password:
        <input
          type="password"
          value={password}
          data-testid="password"
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <input type="submit" value="Login" />
    </form>
  )
}

export default Login
