import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import Loader from './components/Loader'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: [],
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
      const filteredBooks = this.state.books.filter(b => b.id !== book.id)
      this.setState({ books: [...filteredBooks, book] })
    } catch (error) {
      console.error(error)
    }
  }

  searchBooks = async term => {
    try {
      const result = await this.props.api.BooksAPI.search(term)
      return result
    } catch (error) {
      console.error(error)
      return [];
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
