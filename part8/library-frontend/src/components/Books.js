import {  useQuery } from "@apollo/client";

import {fetchBooks} from '../gqlQueries'

const Books = (props) => {

  const result = useQuery(fetchBooks)
  
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks.map(book=>{
    delete book.__typename
    return book
  })

  return (
    <div>
      <h2>books</h2>

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
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
