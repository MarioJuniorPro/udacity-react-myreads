import React from 'react'
import exact from 'prop-types-exact'
import BookCover from './BookCover'

import bookShape from './book.shape'
import BookAuthors from './BookAuthors'

const propTypes = exact({
  book: bookShape
}).isRequired

function Book(props) {
  const { title, imageLinks, authors } = props.book
  const coverImage = (imageLinks && imageLinks.smallThumbnail) || ''
  return (
    <div className="book">
      <div className="book-top">
        <BookCover image_uri={coverImage} />
        {props.children}
      </div>
      <div className="book-title">{title}</div>
      <BookAuthors authors={authors} />
    </div>
  )
}

Book.propTypes = propTypes

export default Book
