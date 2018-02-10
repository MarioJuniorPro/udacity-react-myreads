import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import BookCover from './BookCover'

import bookShape from './book.shape'
import BookAuthors from './BookAuthors'
import BookShelfChanger from './BookShelfChanger'

const propTypes = exact({
  book: bookShape,
  onMove: PropTypes.func
}).isRequired

function Book(props) {
  const { title, imageLinks, authors } = props.book
  const coverImage = (imageLinks && imageLinks.smallThumbnail) || ''
  return (
    <div className="book">
      <div className="book-top">
        <BookCover image_uri={coverImage} />
        <BookShelfChanger book={props.book} onMove={props.onMove} />
      </div>
      <div className="book-title">{title}</div>
      <BookAuthors authors={authors} />
    </div>
  )
}

Book.propTypes = propTypes

export default Book
