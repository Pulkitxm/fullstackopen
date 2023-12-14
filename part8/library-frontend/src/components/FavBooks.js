import React, { useEffect, useState } from 'react';
import { me, fetchBooks } from '../gqlQueries';
import { useQuery } from '@apollo/client';
import { v4 as uuid } from 'uuid'
const FavBooks = (props) => {
  const [userData, setUserData] = useState(null);
  const [bookData, setBookData] = useState(null);
  const [books, setBooks] = useState(null);

  const meData = useQuery(me);
  const bookDataQuery = useQuery(fetchBooks);

  useEffect(() => {
    if (meData.data) {
      setUserData(meData.data.me);
    }
  }, [meData.data]);

  useEffect(() => {
    if (bookDataQuery.data) {
      setBookData(bookDataQuery.data.allBooks);
      setBooks(bookDataQuery.data.allBooks);
    }
  }, [bookDataQuery]);
  useEffect(() => {
    if (userData) {
      const favGenre = userData.favoriteGenre
      if (books && books.length >= 1) {
        setBookData(books.filter(book => {
          return book.genres.indexOf(favGenre) != -1
        }))
      }
    }
  }, [books,userData]);

  if (!props.show || meData.loading || bookDataQuery.loading) {
    return null;
  }
  console.log(userData);
  return (
    <div>
      <h3>These books match you favourite genre</h3>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {bookData && bookData.map((a) => (
            <tr key={uuid()}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default FavBooks;
