import { getAllAuthors, editAuthor, getCurrentUser } from "../queries"
import { useQuery, useMutation } from "@apollo/client/react"
import { useState } from "react"

const Authors = (props) => {
  const result = useQuery(getAllAuthors)
  const user = useQuery(getCurrentUser)
  const [changeBirthYear] = useMutation(editAuthor, {
    refetchQueries: [
      { query: getAllAuthors }
    ]
  })
  const [year, setYear] = useState('')

  if (!props.show) {
    return null
  }

  if(result.loading) {
    return <div>loading...</div>
  }

  const authors = result.data.allAuthors

  const handleSetYear = (event) => {
    event.preventDefault()

    const name = event.target[0].value
    changeBirthYear({ variables: {
      name,
      setBornTo: Number(year)
    }})

    setYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {user.data?.me ? <div>
        <h3>Set birthyear</h3>
        <form onSubmit={handleSetYear}>
          <div>
            name
            <select>
              {authors.map((a) => (
                <option key={a.id} value={a.name}>{a.name}</option>
              ))}
            </select>
          </div>
          <div>
            born
            <input value={year} onChange={({ target }) => setYear(target.value)} />
          </div>
          <button type="submit">update author</button>
        </form>
      </div> : null}
      
    </div>
  )
}

export default Authors