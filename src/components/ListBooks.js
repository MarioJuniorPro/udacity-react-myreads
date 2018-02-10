import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

export default class ListBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {}
  }

  static propTypes = {
    books: PropTypes.array.isRequired,
    updateBook: PropTypes.func
  }

  static defaultProps = {
    books: []
  }

  getBooksByShelf(shelf) {
    return this.props.books.filter(book => book.shelf === shelf)
  }

  moveBook = (book, shelf = '') => {
    //mutate a single property and preserve current info
    const [bookToUpdate] = this.props.books.filter(b => b.id === book.id)
    this.props.updateBook({...bookToUpdate, shelf})
  }

  renderBookList() {
    return (
      <Fragment>
        <div className="list-books-content">
          <div>
            <BookShelf
              title={'Currently Reading'}
              books={this.getBooksByShelf('currentlyReading')}
              moveBook={this.moveBook}
            />
            <BookShelf
              title={'Want to Read'}
              books={this.getBooksByShelf('wantToRead')}
              moveBook={this.moveBook}
            />
            <BookShelf
              title={'Read'}
              books={this.getBooksByShelf('read')}
              moveBook={this.moveBook}
            />
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </Fragment>
    )
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        {this.renderBookList()}
      </div>
    )
  }
}
