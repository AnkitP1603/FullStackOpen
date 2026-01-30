import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription, } from '@apollo/client/react'
import Recommend from './components/Recommend'
import { BOOK_ADDED } from './queries'
import { addAuthorToCache, addBookToCache } from './utils/apolloCache'

const App = () => {
  const [page, setPage] = useState('books')
  const [token, setToken] = useState(localStorage.getItem('library-user-token'))
  const client = useApolloClient()
  
  useSubscription(BOOK_ADDED, {
    onData: ({data}) => {
      console.log(data)
      const addedBook = data.data.bookAdded
      window.alert(`New book added: ${addedBook.title} by ${addedBook.author.name}`)
      addBookToCache(client.cache, addedBook)
      addAuthorToCache(client.cache, addedBook.author)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    // client.resetStore()
    client.clearStore()
    setPage('books')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ? 
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
        : <button onClick={() => setPage('login')}>login</button>}
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'}/>

      <LoginForm show={page === 'login'} setToken={setToken} setPage={setPage}/>

      <NewBook show={page === 'add'} />

      <Recommend show={page === 'recommend'}/>
    </div>
  )
}

export default App