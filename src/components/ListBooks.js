import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom';

import BookShelf from './BookShelf'

export default class ListBooks extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired
  }

  static defaultProps = {
    books: []
  }

  getBooksByShelf(shelf){
    return this.props.books.filter(book => book.shelf === shelf)
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <BookShelf title={'Currently Reading'} books={this.getBooksByShelf('currentlyReading')} />
            <BookShelf title={'Want to Read'} books={this.getBooksByShelf('wantToRead')} />
            <BookShelf title={'Read'} books={this.getBooksByShelf('read')} />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
