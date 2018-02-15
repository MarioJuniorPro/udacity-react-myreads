import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import _ from 'lodash'

import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import Loader from './components/Loader'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      books: [],
      booksSearchResult: [],
      isLoading: true
    }
  }

  static propTypes = exact({
    api: PropTypes.shape({
      BooksAPI: PropTypes.object.isRequired
    }).isRequired
  })

  async componentDidMount() {
    try {
      const books = await this.props.api.BooksAPI.getAll()
      this.setState({ books, isLoading: false })
    } catch (error) {
      console.error(error)
    }
  }

  updateBook = async book => {
    try {
      await this.props.api.BooksAPI.update(book, book.shelf)
      const books = await this.props.api.BooksAPI.getAll()
      const filteredBooks = books.filter(b => b.shelf !== 'none')
      this.setState({ books: filteredBooks })
      this.searchBooks(this.state.query)
    } catch (error) {
      console.error(error)
    }
  }

  searchBooks = async term => {
    try {
      const results = await this.props.api.BooksAPI.search(term)
      const books = _.isArray(results) ? results : []
      const booksInTheShelf = books.map(
        book => (book.shelf ? book : { ...book, shelf: 'none' })
      )
      this.setState({ booksSearchResult: booksInTheShelf, query: term })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    return (
      <Router>
        <div className="app">
          <Switch>
            <Route
              path="/"
              exact
              render={() =>
                this.state.isLoading ? (
                  <Loader />
                ) : (
                  <ListBooks
                    books={this.state.books}
                    updateBook={this.updateBook}
                  />
                )
              }
            />
            <Route
              path={'/search'}
              exact
              render={() => (
                <SearchBooks
                  query={this.state.query}
                  books={this.state.booksSearchResult}
                  updateBook={this.updateBook}
                  searchBooks={this.searchBooks}
                />
              )}
            />
          </Switch>
        </div>
      </Router>
    )
  }
}

export default App
