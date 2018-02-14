import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

import Book from './Book';
import BookShelfChanger from './BookShelfChanger'

const propTypes = exact({
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired,
  moveBook: PropTypes.func
})

const defaultProps = {
  books: [],
};

function BookShelf(props) {
  const { title, books } = props
  const bookCount = books.length
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title} ({bookCount})</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => (
          <li key={book.id}>
            <Book book={book}>
              <BookShelfChanger book={book} onMove={props.moveBook} />
            </Book>
          </li>
          ))}
        </ol>
      </div>
    </div>
  )
}

BookShelf.propTypes = propTypes
BookShelf.defaultProps = defaultProps

export default BookShelf
