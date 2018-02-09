import React from 'react'
import exact from 'prop-types-exact'
import BookCover from './BookCover';

import bookShape from './book.shape'
import BookAuthors from './BookAuthors';

const propTypes = exact({
  book: bookShape
}).isRequired

function Book(props) {
  const { title, imageLinks, authors } = props.book
  const coverImage = (imageLinks && imageLinks.smallThumbnail || '')
  return (
    <div className="book">
      <div className="book-top">
        <BookCover image_uri={coverImage} />
        <div className="book-shelf-changer">
          <select>
            <option value="none" disabled>
              Move to...
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            <option value="none">None</option>
          </select>
        </div>
      </div>
      <div className="book-title">{title}</div>
      <BookAuthors authors={authors} />
    </div>
  )
}

Book.propTypes = propTypes

export default Book
