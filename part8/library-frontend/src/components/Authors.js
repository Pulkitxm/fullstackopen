import {  useQuery } from "@apollo/client";

import {fetchAuthors} from '../gqlQueries'

const Authors = (props) => {

  const result = useQuery(fetchAuthors)

  if (!props.show) {
    return null
  }

  
  if (result.loading){
    return <div>loading...</div>
  }
  
  // const authors = result.data.allAuthors
  const authors = result.data.allAuthors.map(author=>{
    delete author.__typename;
    return author
  })

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
    </div>
  )
}

export default Authors
