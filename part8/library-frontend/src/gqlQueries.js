import { gql } from "@apollo/client"

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    author{
      born
      bookCount
      name
    }
    genres
    published
    title
  }
}
`

export const fetchAuthors = gql`
  query AllAuthors {
    allAuthors {
      born
      bookCount
      name
    }
  }
`

export const fetchBooks = gql`
  query AllBooks {
    allBooks {
      author{
        born
        bookCount
        name
      }
      genres
      published
      title
    }
  }
`

export const editAuthor = gql`
  mutation Mutation($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      bookCount
      born
      name
    }
  }
`