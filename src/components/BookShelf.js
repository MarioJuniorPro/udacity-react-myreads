import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { Link } from 'react-router-dom'

import BookGrid from './BookGrid'

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
        {
          bookCount > 0 ? 
          <BookGrid books={books} moveBook={props.moveBook}></BookGrid>:
          <p className="book-shelf-empty">No books? You can search <Link to="/search">here</Link> </p>
        }
      </div>
    </div>
  )
}

BookShelf.propTypes = propTypes
BookShelf.defaultProps = defaultProps

export default BookShelf
