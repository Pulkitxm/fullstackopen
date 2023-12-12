import {  useQuery } from "@apollo/client";
import {useState,useEffect} from 'react'
import {fetchBooks} from '../gqlQueries'
import {v4 as uuid} from 'uuid'
const Books = (props) => {
  const [orgbooks, setorgbooks] = useState([])
  const [books, setbooks] = useState([])
  const [genres, setGenres] = useState([])
  const result = useQuery(fetchBooks)
  useEffect(() => {
    const res = result.data
    if (res) {
      setbooks(res.allBooks)
      setorgbooks(res.allBooks)
      const a=[]
      for (let book of res.allBooks) {
        book.genres.map(i =>a.push(i))
      }
      setGenres(a)
    }
  }, [result])
 
  if (!props.show || result.loading) {
    return null
  }
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
            <tr key={uuid()}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        genres.map(genre => {
          return <button
            key={uuid()}
            onClick={() => {
              setbooks(orgbooks.filter(book => {
                return book.genres.indexOf(genre)!=-1
              }))
            }}
          >{genre}</button>
        })
      }
      <button
        key={uuid()}
        onClick={() => {
          setbooks(orgbooks)
        }}
      >all</button>
    </div>
  )
}

export default Books
