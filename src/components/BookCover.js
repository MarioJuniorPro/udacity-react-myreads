import React from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'

const propTypes = exact({
  image_uri: PropTypes.string.isRequired,
  height: PropTypes.number,
  width: PropTypes.number
})

const defaultProps = {
  image_uri: '',
  height: 192,
  width: 128
}

function BookCover(props) {
  const { image_uri, height, width } = props
  return (
    <div className="book-cover" style={{ width: width, height: height, backgroundImage: `url(${image_uri})` }} />
  )
}

BookCover.propTypes = propTypes
BookCover.defaultProps = defaultProps

export default BookCover
