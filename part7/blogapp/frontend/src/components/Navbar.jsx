import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logoutUser())
        dispatch(notify(`Bye, ${user.name}!`))
    }

    if(!user) {
        return null
    }

    return (
        <nav style={{ display: 'flex', gap: '0.5rem', background:'lightgray', padding: '0.25rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Link to={"/blogs"}>blogs </Link>
                <Link to={"/users"}>users </Link>    
            </div>
            <div>
                {user.name} logged in 
                <button style={{ marginLeft: 3 }} onClick={handleLogout}>logout</button>
            </div>
        </nav>
    )
}

export default Navbar