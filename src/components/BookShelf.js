import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

import BooksGrid from './BooksGrid';

const propTypes = exact({
  title: PropTypes.string.isRequired,
  books: PropTypes.array.isRequired
})

const defaultProps = {
  books: [],
};

function BookShelf(props) {
  const { title, books } = props
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title} </h2>
      <div className="bookshelf-books">
        <BooksGrid books={books}/>
      </div>
    </div>
  )
}

BookShelf.propTypes = propTypes
BookShelf.defaultProps = defaultProps

export default BookShelf
