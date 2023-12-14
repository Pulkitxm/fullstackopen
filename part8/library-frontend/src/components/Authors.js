import {  useQuery } from "@apollo/client";
import AuthorForm from './AuthorForm'
import {fetchAuthors} from '../gqlQueries'

const Authors = (props) => {

  const result = useQuery(fetchAuthors)

  if (!props.show) {
    return null
  }

  
  if (result.loading){
    return <div>loading...</div>
  }
  const authors = result.data.allAuthors
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
            <tr key={a.name+a.born}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <AuthorForm/>
    </div>
  )
}

export default Authors
