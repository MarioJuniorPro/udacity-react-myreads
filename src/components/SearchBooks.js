import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import _ from 'lodash'

import {DebounceInput} from 'react-debounce-input';
import BookGrid from './BookGrid'

export default class SearchBooks extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      books: []
    }
  }

  static propTypes = {
    updateBook: PropTypes.func,
    searchBooks: PropTypes.func
  }

  setSearchTerm = async term => {
    try {
      const results = await this.props.searchBooks(term)
      
      const books = _.isArray(results) ? results : []
      const booksInTheShelf = books.map(
        book => (book.shelf ? book : { ...book, shelf: 'none' })
      )
      this.setState({ books: booksInTheShelf })
    } catch (error) {
      this.setState({ books: [] })
    }
  }

  moveBook = async (book, shelf) => {
    //mutate a single property and preserve current info
    try {
      const bookToUpdate = _.head(this.state.books.filter(b => b.id === book.id))
      await this.props.updateBook({ ...bookToUpdate, shelf })
      this.setState(prevState => {
        return { books: prevState.books.filter(b => b.id !== bookToUpdate.id) }
      })
    } catch (error) {
    }
  }

  render() {
    const books = this.state.books
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
          <DebounceInput
            placeholder="Search by title or author"
            minLength={2}
            debounceTimeout={300}
            onChange={e => {
              this.setSearchTerm(e.target.value)
            }} />
          </div>
        </div>
        <div className="search-books-results">
          <BookGrid books={books} moveBook={this.moveBook} />
        </div>
      </div>
    )
  }
}
