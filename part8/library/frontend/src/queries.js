import { gql } from "@apollo/client"

const getAllAuthors = gql `
query getAllAuthors {
  allAuthors {
    id
    name
    born
    bookCount
  }
}
`

const getAllBooks = gql `
query getAllBooks($author : String, $genre: String) {
    allBooks(authorName: $author, genre: $genre) {
      title
      published
      id
      genres
      author {
        id
        name
      }
    }
}
`

const addBook = gql`
mutation AddBook(
  $title: String!, 
  $author: String!,
  $published: Int!, 
  $genres: [String!]!
) {
  addBook(title: $title, authorName: $author, published: $published, genres: $genres) {
    id
    title
    published
    genres
    author {
      id
      name
      born
      bookCount
    }
  }
}
`

const editAuthor = gql`
mutation editAuthorBorn(
    $name: String!
    $setBornTo: Int!
) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    born
  }
}
`

const loginUser = gql `
mutation login(
  $username: String!, 
  $password: String!
) {
  login(username: $username, password: $password) {
    value
  }
}
`

const getCurrentUser = gql `
query me {
  me {
    id
    username
    favouriteGenre
  }
}
`

const BOOK_ADDED = gql `
subscription BookAdded{
  bookAdded {
    author {
      name
      id
      born
      bookCount
    }
    title
    genres
    id
    published
  }
}
`

export { getAllAuthors, getAllBooks, addBook, editAuthor, loginUser, getCurrentUser, BOOK_ADDED }