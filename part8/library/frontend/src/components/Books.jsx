import { useQuery } from "@apollo/client/react"
import { getAllBooks } from "../queries"
import { useState } from "react"

const Books = (props) => {
    const [genre, setGenre] = useState(null)
    const result = useQuery(getAllBooks, {
        variables: { genre: genre ?? null },
    })

    if (!props.show) {
        return null
    }

    if(result.loading) {
        return <div>loading...</div>
    }

    let books = result.data.allBooks
    const genres = ["refactoring", "agile", "patterns", "design", "crime", "classic", "novel"]

    // if(genre) {
    //     books = books.filter(b => b.genres.includes(genre))
    // }

    return (
        <div>
            <h2>books</h2>

            {genre ? <p>in genre <strong>{genre}</strong></p> : <p>all genres</p>}

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

            <div>
                {genres.map(g => 
                    <button key={g} onClick={() => setGenre(g)}>{g}</button>
                )}
                <button onClick={() => setGenre(null)}>all genres</button>
            </div>
        </div>
    )
}

export default Books