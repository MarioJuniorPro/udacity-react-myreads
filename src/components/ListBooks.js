import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import BookShelf from './BookShelf'

export default class ListBooks extends Component {
  constructor(props) {
    super(props)
    this.state = {
      shelfs: [
        { title: 'Currently Reading', type: 'currentlyReading'},
        { title: 'Want to Read', type: 'wantToRead'},
        { title: 'Read', type: 'read'}
      ]
    }
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
    this.props.updateBook({ ...bookToUpdate, shelf })
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            { this.state.shelfs.map(({title, type}) => (
              <BookShelf
                key={title}
                title={title}
                books={this.getBooksByShelf(type)}
                moveBook={this.moveBook}
            />  
            ))}
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}
