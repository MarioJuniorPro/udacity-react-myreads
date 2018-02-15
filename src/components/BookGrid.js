import React from 'react'
import PropTypes from 'prop-types'

import Book from './Book';
import BookShelfChanger from './BookShelfChanger'

const propTypes = {
  books: PropTypes.array,
  moveBook: PropTypes.func
}

const defaultProps = {
  books: []
}

const BookGrid = (props) => {
  return (
    <ol className="books-grid">
      {props.books.map(book => (
        <li key={book.id}>
          <Book book={book}>
            <BookShelfChanger book={book} onMove={props.moveBook} />
          </Book>
        </li>
      ))}
    </ol>
  )
}

BookGrid.propTypes = propTypes
BookGrid.defaultProps = defaultProps

export default BookGrid