import React from 'react'
import { getCurrentUser, loginUser } from '../queries'
import { useApolloClient, useMutation } from '@apollo/client/react'
import { useState } from 'react'

const LoginForm = ({setToken, show, setPage}) => {
    const client = useApolloClient()
    const [login] = useMutation(loginUser,{
        onCompleted: async (data) => {
            const token = data.login.value
            setToken(token)
            localStorage.setItem('library-user-token', token)
            
            await client.refetchQueries({ include: [getCurrentUser] })
            setPage('books')
        }
    })
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    if(!show) {
        return null
    }

    const handleLogin = (event) => {
        event.preventDefault()
        login({ variables: { username, password }})
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    <label>
                    username
                    <input value={username} onChange={({target}) => setUsername(target.value)}/>
                    </label>
                </div>
                
                <div>
                    <label>
                    password
                    <input type="password" value={password} onChange={({target}) => setPassword(target.value)}/>
                    </label>
                </div>

                <button type="submit">login</button>
            </form>
        </div>
    )
}

export default LoginForm