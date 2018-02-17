import React, { Component } from 'react'
import PropTypes from 'prop-types'
import exact from 'prop-types-exact'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'

import './App.css'
import ListBooks from './components/ListBooks'
import SearchBooks from './components/SearchBooks'
import BookDetails from './components/BookDetails'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      books: []
    }
  }

  static propTypes = exact({
    api: PropTypes.shape({
      BooksAPI: PropTypes.object.isRequired
    }).isRequired
  })

  async componentDidMount() {
    const books = await this.props.api.BooksAPI.getAll()
    this.setState({ books })
  }

  findBookShelf = bookId => {
    const [book] = this.state.books.filter(b => b.id === bookId)
    return book && book.shelf ? book.shelf : 'none'
  }

  syncBookShelf = (book, shelf) => {
    const newBookRef = {...book, shelf}
    this.setState(prevState => {
      const updatedBookList = [...prevState.books.filter(b => b.id !== book.id), newBookRef]
      return { books: updatedBookList }
    })
  }

  render() {
    return (
      <Router>
        <div className="app">
          <ToastContainer autoClose={3000} />
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ListBooks
                  api={this.props.api}
                  toast={toast}
                  books={this.state.books}
                  syncBookShelf={this.syncBookShelf}
                />
              )}
            />
            <Route
              path={'/search'}
              exact
              render={() => (
                <SearchBooks
                  api={this.props.api}
                  toast={toast}
                  findBookShelf={this.findBookShelf}
                  syncBookShelf={this.syncBookShelf}
                />
              )}
            />
            <Route
              path={'/book/:bookId'}
              exact
              render={() => (
                <BookDetails
                  api={this.props.api}
                  toast={toast}
                  syncBookShelf={this.syncBookShelf}
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
