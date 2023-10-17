import { gql, useQuery } from "@apollo/client";

const query = gql`
  query AllAuthors {
    allBooks {
      author
      published
      title
    }
  }
`

const Books = (props) => {

  const result = useQuery(query)
  
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks.map(book=>{
    delete book.__typename
    return book
  })
  console.log(books);

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
            <tr key={a.title}>
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
