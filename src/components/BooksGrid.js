import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import Book from './Book';

const propTypes = exact({
  books: PropTypes.array.isRequired
})

const defaultProps = {
  books: []
}

function BooksGrid(props) {
  const { books } = props
  return (
    <ol className="books-grid">
      {books.map(book => <li key={book.id}><Book book={book}/></li>)}
    </ol>
  )
}

BooksGrid.propTypes = propTypes
BooksGrid.defaultProps = defaultProps

export default BooksGrid
