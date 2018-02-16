import React from 'react'
import exact from 'prop-types-exact'
import { Link } from 'react-router-dom'

import bookShape from './book.shape'
import BookCover from './BookCover'
import BookAuthors from './BookAuthors'

const propTypes = exact({
  book: bookShape
}).isRequired

function Book(props) {
  const { id, title, imageLinks, authors } = props.book
  const coverImage = (imageLinks && imageLinks.smallThumbnail) || ''
  return (
    <div className="book">
      <div className="book-top">
        <Link to={`/book/${id}`}>
          <BookCover image_uri={coverImage} />
        </Link>
        {props.children}
      </div>
      <div className="book-title">
        <Link to={`/book/${id}`}>{title}</Link>
      </div>
      <BookAuthors authors={authors} />
    </div>
  )
}

Book.propTypes = propTypes

export default Book
