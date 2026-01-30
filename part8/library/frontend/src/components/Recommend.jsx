import { useQuery } from '@apollo/client/react'
import { getAllBooks, getCurrentUser } from '../queries'

const Recommend = ({show}) => {
    const result = useQuery(getAllBooks)
    const user = useQuery(getCurrentUser)

    if (!show) {
        return null
    }
    
    if(result.loading || user.loading) {
        return <div>loading...</div>
    }

    const genre = user.data.me.favouriteGenre

    console.log(genre)

    const books = result.data.allBooks.filter(b => b.genres.includes(genre))

    return (
        <div>
            <h2>recommendations</h2>

            <p>books in your favourite genre <strong>{genre}</strong></p>

            <table>
                <tbody>
                <tr>
                    <th></th>
                    <th>author</th>
                    <th>published</th>
                </tr>
                {books.map((a) => (
                    <tr key={a.id}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend