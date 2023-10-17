import { gql } from "@apollo/client"

export const CREATE_BOOK = gql`
mutation Mutation($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(title: $title, author: $author, published: $published, genres: $genres) {
    author
    genres
    id
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
      id
      name
    }
  }
`

export const fetchBooks = gql`
  query AllBooks {
    allBooks {
      author
      genres
      id
      published
      title
    }
  }
`