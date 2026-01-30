import { getAllBooks, getAllAuthors } from "../queries";

export const addBookToCache = (cache, addedBook) => {
    const genres = addedBook.genres.concat(null)

    genres.forEach(genre => {
        try {
            const data =  cache.readQuery({ query: getAllBooks, variables: {genre} })

            if (!data) return

            cache.updateQuery({ query: getAllBooks, variables: {genre} }, ({ allBooks }) => {
                if (allBooks.map(b => b.id).includes(addedBook.id)) {
                    return { allBooks }
                }
                return {
                    allBooks: allBooks.concat(addedBook)
                }
            })
        } catch (e) {
            // query not in cache, do nothing
        }
    })
}

export const addAuthorToCache = (cache, addedAuthor) => {
    cache.updateQuery({ query: getAllAuthors }, ({ allAuthors }) => {
        if (allAuthors.map(a => a.id).includes(addedAuthor.id)) {
            return { allAuthors }
        }
        return {
            allAuthors: allAuthors.concat(addedAuthor)
        }
    })
}