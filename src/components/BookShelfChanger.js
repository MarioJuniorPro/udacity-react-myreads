import React, { Component } from 'react'
import PropTypes from 'prop-types'

import bookShape from './book.shape'

export default class BookShelfChanger extends Component {
  static propTypes = {
    book: bookShape.isRequired,
    onMove: PropTypes.func.isRequired
  }

  handleChange = (e) => {
    e.preventDefault()
  }

  render() {
    return (
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
    )
  }
}
