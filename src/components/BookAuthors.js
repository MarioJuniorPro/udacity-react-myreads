import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

const propTypes = exact({
  authors: PropTypes.oneOfType([PropTypes.string, PropTypes.array]).isRequired
})

const defaultProps = {
  authors: []
}

// Split authors by comma
const splitAuthors = str => str.split(',').map(author => author.trim())

const getAuthorsAsArray = authors => typeof authors === 'string' ? splitAuthors(authors) : authors

const listAuthors = authors => authors.join(', ')


function BookAuthors(props) {
  const authors = getAuthorsAsArray(props.authors)
  return <div className="book-authors">{listAuthors(authors)}</div>
}

BookAuthors.propTypes = propTypes
BookAuthors.defaultProps = defaultProps

export default BookAuthors
